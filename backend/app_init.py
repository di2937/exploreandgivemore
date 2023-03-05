import os
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DB_URI", "sqlite:///" + os.path.join(basedir, "db.sqlite")
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)  # enable cross-origin resource sharing

# initialize database
def init_database(app: Flask) -> SQLAlchemy:
    return SQLAlchemy(app)


# initialize marshmallow
def init_marshmallow(app: Flask) -> Marshmallow:
    return Marshmallow(app)


# exported objects from __file__ ↓
db = init_database(app)
ma = init_marshmallow(app)
