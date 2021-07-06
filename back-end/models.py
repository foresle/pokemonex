import json
from sqlalchemy import Column, Integer, String
from app import Base, bcrypt


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    favorite_pokemon = Column(String(600), nullable=True)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = bcrypt.generate_password_hash(password)
        self.favorite_pokemon = json.dumps([])
