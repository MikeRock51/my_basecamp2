#!/usr/bin/env python3
"""Defines the project schema"""

from sqlalchemy import Column, String, ForeignKey
from models.base_model import BaseModel, Base
from sqlalchemy.orm import relationship


class Project(BaseModel, Base):
    """The project class"""
    __tablename__ = "projects"

    name = Column(String(120), nullable=False)
    description = Column(String(1024), nullable=False)
    creatorId = Column(String(60), ForeignKey("users.id"), nullable=False)
    members = relationship("Member", cascade="all, delete, delete-orphan")
    author = Column(String(120), nullable=False)
