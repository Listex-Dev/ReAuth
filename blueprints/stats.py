from flask import Blueprint, jsonify, request
from models import db, User, ClientApp, AuthSession, EventLog
from sqlalchemy import func

stats_bp = Blueprint('stats', __name__)

# Статистика по пользователям, приложениям, авторизациям, географии
@stats_bp.route('/stats', methods=['GET'])
def stats():
    users_count = db.session.query(func.count(User.id)).scalar()
    apps_count = db.session.query(func.count(ClientApp.client_id)).scalar()
    auth_count = db.session.query(func.count(AuthSession.code)).scalar()
    # Пример: география по IP (если есть)
    geo = db.session.query(EventLog.ip, func.count(EventLog.id)).group_by(EventLog.ip).all()
    geo_stats = [{'ip': ip, 'count': count} for ip, count in geo]
    return jsonify({
        'users': users_count,
        'apps': apps_count,
        'authorizations': auth_count,
        'geo': geo_stats,
        'description': 'Общая статистика по пользователям, приложениям и авторизациям.'
    })

# Журнал событий (последние 100)
@stats_bp.route('/events', methods=['GET'])
def events():
    logs = EventLog.query.order_by(EventLog.created_at.desc()).limit(100).all()
    return jsonify([
        {
            'id': log.id,
            'event_type': log.event_type,
            'user_id': log.user_id,
            'client_id': log.client_id,
            'description': log.description,
            'ip': log.ip,
            'created_at': log.created_at
        } for log in logs
    ]) 