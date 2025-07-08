import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev_secret_key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///reauth.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET = os.environ.get('JWT_SECRET', 'jwt_dev_secret')
    OAUTH_CODE_EXPIRES = 600  # 10 минут
    ACCESS_TOKEN_EXPIRES = 3600  # 1 час
    REFRESH_TOKEN_EXPIRES = 2592000  # 30 дней 