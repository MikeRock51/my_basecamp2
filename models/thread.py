#!/usr/bin/env python3
"""The Thread module"""

from sqlalchemy import Column, String, ForeignKey
from models.base_model import BaseModel, Base


class Thread(BaseModel, Base):
    """Defines the thread schema"""
    __tablename__ = "threads"

    topic = Column(String(256), nullable=False)
    projectId = Column(String(60), ForeignKey("projects.id"), nullable=False)
