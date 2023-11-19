from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
CORS(app)
app.config.from_object('config')
db = SQLAlchemy(app)