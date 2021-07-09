import json
from datetime import timedelta
from flask_bcrypt import Bcrypt
from flask import Flask, request, jsonify
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from config import Config
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
engine = create_engine('sqlite:///test.db')
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
CORS(app)

import models


def init_db():
    Base.metadata.create_all(bind=engine)


# init_db()


@app.route('/register', methods=['POST'])
def register():
    params = request.json
    if len(models.User.query.filter(models.User.email == params.get('email')).all()) != 0:
        return jsonify({'msg': 'Email exist'}), 403

    user = models.User(**params)
    db_session.add(user)
    db_session.commit()

    expire_delta = timedelta(24)
    access_token = create_access_token(user.id, expires_delta=expire_delta)
    return jsonify({'access_token': access_token}), 200


@app.route('/login', methods=['POST'])
def login():
    params = request.json
    user = models.User.query.filter(models.User.email == params.get('email')).first()
    if not bcrypt.check_password_hash(user.password, params.get('password')):
        return jsonify({'msg': 'Password not valid'}), 403

    expire_delta = timedelta(24)
    access_token = create_access_token(user.id, expires_delta=expire_delta)
    return jsonify({'access_token': access_token}), 200


@app.route("/favorite/<int:pokemon_id>", methods=["GET"])
@jwt_required()
def add_favorite_pokemon(pokemon_id):
    current_user = get_jwt_identity()
    user = models.User.query.get(current_user)
    if not user:
        return 'Bad user', 403
    if user.favorite_pokemon:
        favorite_array = json.loads(user.favorite_pokemon)
        if pokemon_id in favorite_array:
            return 'Duplicate', 403
    else:
        favorite_array = []
    favorite_array.append(pokemon_id)
    user.favorite_pokemon = json.dumps(favorite_array)
    db_session.add(user)
    db_session.commit()
    return jsonify(logged_in_as=current_user), 200


@app.route("/unfavored/<int:pokemon_id>", methods=["GET"])
@jwt_required()
def unfavored_pokemon(pokemon_id):
    current_user = get_jwt_identity()
    user = models.User.query.get(current_user)
    if not user:
        return 'Bad user', 403
    if user.favorite_pokemon:
        favorite_array = json.loads(user.favorite_pokemon)
        if not (pokemon_id in favorite_array):
            return 'Bad request', 403
    else:
        return 'Bad request', 403

    favorite_array.remove(pokemon_id)
    user.favorite_pokemon = json.dumps(favorite_array)
    db_session.add(user)
    db_session.commit()
    return jsonify(logged_in_as=current_user), 200


@app.route("/my_favorite", methods=["GET"])
@jwt_required()
def my_favorite():
    current_user = get_jwt_identity()
    user = models.User.query.get(current_user)
    if not user:
        return 'Bad user', 403
    return user.favorite_pokemon, 200


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


if __name__ == '__main__':
    app.run('0.0.0.0:5000', debug=True)
