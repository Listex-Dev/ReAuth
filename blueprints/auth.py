from flask import Blueprint, request, jsonify, current_app
from models import db, User
import bcrypt
import jwt
from datetime import datetime, timedelta

auth_bp = Blueprint('auth', __name__)

# Регистрация пользователя
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    if not email or not password:
        return jsonify({'error': 'Email и пароль обязательны'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Пользователь с такой почтой уже существует'}), 409
    pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    user = User(email=email, password_hash=pw_hash, name=name)
    db.session.add(user)
    db.session.commit()
    return jsonify({'msg': 'Пользователь успешно зарегистрирован'})

# Авторизация пользователя
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.checkpw(password.encode(), user.password_hash.encode()):
        return jsonify({'error': 'Неверный email или пароль'}), 401
    payload = {
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.utcnow() + timedelta(hours=1)
    }
    token = jwt.encode(payload, current_app.config['JWT_SECRET'], algorithm='HS256')
    return jsonify({'access_token': token})

# OAuth 2.0 endpoints (заглушки)
@auth_bp.route('/authorize', methods=['GET', 'POST'])
def authorize():
    return jsonify({'msg': 'Точка входа OAuth авторизации (заглушка)'})

@auth_bp.route('/token', methods=['POST'])
def token():
    return jsonify({'msg': 'Точка выдачи OAuth токена (заглушка)'})

@auth_bp.route('/token/revoke', methods=['POST'])
def revoke_token():
    return jsonify({'msg': 'Точка отзыва OAuth токена (заглушка)'}) 