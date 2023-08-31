#!/usr/bin/env python3
"""The Thread module"""

from sqlalchemy import Column, String, ForeignKey
from models.base_model import BaseModel, Base
from sqlalchemy.orm import relationship


class Thread(BaseModel, Base):
    """Defines the thread schema"""
    __tablename__ = "threads"

    topic = Column(String(256), nullable=False)
    projectId = Column(String(60), ForeignKey("projects.id"), nullable=False)
    messages = relationship('Message', backref='thread', cascade='all, delete')
    authorId = Column(String(60), ForeignKey('users.id'), nullable=False)
