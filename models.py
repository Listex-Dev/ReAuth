from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255))
    avatar = db.Column(db.String(255))
    phone = db.Column(db.String(32))
    address = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ClientApp(db.Model):
    __tablename__ = 'client_apps'
    client_id = db.Column(db.String(64), primary_key=True)
    client_secret = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    redirect_uri = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    owner = db.relationship('User', backref='apps')

class AuthSession(db.Model):
    __tablename__ = 'auth_sessions'
    code = db.Column(db.String(128), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    client_id = db.Column(db.String(64), db.ForeignKey('client_apps.client_id'))
    scope = db.Column(db.String(255))
    expires_at = db.Column(db.DateTime)
    used = db.Column(db.Boolean, default=False)
    user = db.relationship('User')
    client = db.relationship('ClientApp')

class Scope(db.Model):
    __tablename__ = 'scopes'
    id = db.Column(db.String(64), primary_key=True)
    description = db.Column(db.String(255))
    category = db.Column(db.String(64))

class AppScope(db.Model):
    __tablename__ = 'app_scopes'
    app_id = db.Column(db.String(64), db.ForeignKey('client_apps.client_id'), primary_key=True)
    scope_id = db.Column(db.String(64), db.ForeignKey('scopes.id'), primary_key=True)
    app = db.relationship('ClientApp', backref='app_scopes')
    scope = db.relationship('Scope', backref='app_scopes')

class EventLog(db.Model):
    __tablename__ = 'event_logs'
    id = db.Column(db.Integer, primary_key=True)
    event_type = db.Column(db.String(64))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    client_id = db.Column(db.String(64), db.ForeignKey('client_apps.client_id'))
    description = db.Column(db.Text)
    ip = db.Column(db.String(64))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user = db.relationship('User')
    client = db.relationship('ClientApp') 