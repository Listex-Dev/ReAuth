from flask import Flask
import os
import sys
from config import Config
from models import db
from flask_migrate import Migrate
from flask_cors import CORS
import subprocess

# Добавляем папку blueprints в sys.path для удобного импорта
sys.path.append(os.path.join(os.path.dirname(__file__), 'blueprints'))

from blueprints.auth import auth_bp
from blueprints.user import user_bp
from blueprints.developer import developer_bp
from blueprints.stats import stats_bp
app = Flask(__name__)
app.config.from_object(Config)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

db.init_app(app)
migrate = Migrate(app, db)

# Регистрация блюпринтов
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(developer_bp, url_prefix='/developer')
app.register_blueprint(stats_bp, url_prefix='/stats')

def auto_upgrade():
    try:
        subprocess.run(["flask", "db", "upgrade"], check=True)
    except Exception as e:
        print("Ошибка при применении миграций:", e)

# После инициализации app и db:
with app.app_context():
    db.create_all()


@app.route('/health')
def health_check():
    return {'status': 'ok'}

if __name__ == '__main__':
    app.run(debug=True)
