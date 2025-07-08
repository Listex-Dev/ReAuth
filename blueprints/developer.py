from flask import Blueprint, request, jsonify
from models import db, ClientApp, AppScope, Scope, User
import secrets
from datetime import datetime

developer_bp = Blueprint('developer', __name__)

# Получить список приложений
@developer_bp.route('/apps', methods=['GET'])
def get_apps():
    owner_id = request.args.get('owner_id')  # В реальном проекте брать из auth
    if not owner_id:
        return jsonify({'error': 'owner_id обязателен'}), 400
    apps = ClientApp.query.filter_by(owner_id=owner_id).all()
    return jsonify([{
        'client_id': app.client_id,
        'name': app.name,
        'description': app.description,
        'redirect_uri': app.redirect_uri,
        'created_at': app.created_at,
        'scopes': [ascope.scope_id for ascope in app.app_scopes]
    } for app in apps])

# Создать новое приложение
@developer_bp.route('/apps', methods=['POST'])
def create_app():
    data = request.json
    name = data.get('name')
    description = data.get('description')
    redirect_uri = data.get('redirect_uri')
    owner_id = data.get('owner_id')  # В реальном проекте брать из auth
    scopes = data.get('scopes', [])
    if not all([name, redirect_uri, owner_id]):
        return jsonify({'error': 'Поля name, redirect_uri и owner_id обязательны'}), 400
    client_id = secrets.token_urlsafe(16)
    client_secret = secrets.token_urlsafe(32)
    app = ClientApp(client_id=client_id, client_secret=client_secret, name=name, description=description, redirect_uri=redirect_uri, owner_id=owner_id)
    db.session.add(app)
    for scope_id in scopes:
        db.session.add(AppScope(app_id=client_id, scope_id=scope_id))
    db.session.commit()
    return jsonify({'client_id': client_id, 'client_secret': client_secret})

# Обновить приложение или регенерировать secret
@developer_bp.route('/apps/<client_id>', methods=['PUT'])
def update_app(client_id):
    data = request.json
    app = ClientApp.query.get(client_id)
    if not app:
        return jsonify({'error': 'Приложение не найдено'}), 404
    # В реальном проекте: проверка owner_id
    if request.args.get('regen_secret') == '1':
        app.client_secret = secrets.token_urlsafe(32)
    if 'name' in data:
        app.name = data['name']
    if 'description' in data:
        app.description = data['description']
    if 'redirect_uri' in data:
        app.redirect_uri = data['redirect_uri']
    if 'scopes' in data:
        AppScope.query.filter_by(app_id=client_id).delete()
        for scope_id in data['scopes']:
            db.session.add(AppScope(app_id=client_id, scope_id=scope_id))
    db.session.commit()
    return jsonify({'msg': 'Приложение успешно обновлено', 'client_secret': app.client_secret})

# Удалить приложение
@developer_bp.route('/apps/<client_id>', methods=['DELETE'])
def delete_app(client_id):
    app = ClientApp.query.get(client_id)
    if not app:
        return jsonify({'error': 'Приложение не найдено'}), 404
    # В реальном проекте: проверка owner_id
    AppScope.query.filter_by(app_id=client_id).delete()
    db.session.delete(app)
    db.session.commit()
    return jsonify({'msg': 'Приложение успешно удалено'}) 