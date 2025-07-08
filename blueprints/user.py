from flask import Blueprint, request, jsonify, current_app
from models import db, User, AuthSession, ClientApp, AppScope
import jwt
from functools import wraps

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[-1]
        if not token:
            return jsonify({'error': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, current_app.config['JWT_SECRET'], algorithms=['HS256'])
            user = User.query.get(data['user_id'])
            if not user:
                raise Exception('User not found')
        except Exception as e:
            return jsonify({'error': 'Token is invalid!'}), 401
        return f(user, *args, **kwargs)
    return decorated

user_bp = Blueprint('user', __name__)

# Получение профиля
@user_bp.route('/profile', methods=['GET'])
@token_required
def profile(user):
    return jsonify({
        'id': user.id,
        'email': user.email,
        'name': user.name,
        'avatar': user.avatar,
        'phone': user.phone,
        'address': user.address,
        'created_at': user.created_at
    })

# Обновление профиля
@user_bp.route('/profile', methods=['PUT'])
@token_required
def update_profile(user):
    data = request.json
    for field in ['name', 'avatar', 'phone', 'address']:
        if field in data:
            setattr(user, field, data[field])
    db.session.commit()
    return jsonify({'msg': 'Профиль обновлён'})

# /userinfo endpoint (OAuth)
@user_bp.route('/userinfo', methods=['GET'])
@token_required
def userinfo(user):
    # В реальном OAuth: фильтровать поля по scope
    return jsonify({
        'sub': user.id,
        'name': user.name,
        'email': user.email,
        'avatar': user.avatar,
        'phone': user.phone,
        'address': user.address
    })

# История авторизаций
@user_bp.route('/authorizations', methods=['GET'])
@token_required
def authorizations(user):
    sessions = AuthSession.query.filter_by(user_id=user.id).order_by(AuthSession.expires_at.desc()).all()
    return jsonify([
        {
            'client_id': s.client_id,
            'scope': s.scope,
            'expires_at': s.expires_at,
            'used': s.used
        } for s in sessions
    ])

# Отзыв доступа к приложению
@user_bp.route('/revoke/<client_id>', methods=['POST'])
@token_required
def revoke_app(user, client_id):
    # Удаляем все сессии и разрешения для этого приложения
    AuthSession.query.filter_by(user_id=user.id, client_id=client_id).delete()
    AppScope.query.filter_by(app_id=client_id).delete()  # опционально
    db.session.commit()
    return jsonify({'msg': 'Доступ к приложению отозван'}) 