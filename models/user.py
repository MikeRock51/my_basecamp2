#!/usr/bin/env python3
"""Defines the user schema"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """The user class"""
    __tablename__ = "users"

    name = Column(String(120), nullable=False)
    email = Column(String(120), nullable=False, unique=True)
    password = Column(String(120), nullable=False)
    projects = relationship('Project', backref="creator", cascade="all, delete")
