#!/usr/bin/env python3
"""The attachments module"""

from sqlalchemy import Column, String, ForeignKey
from models.base_model import BaseModel, Base


class Attachment(BaseModel, Base):
    """Defines an Attachment object"""
    __tablename__ = 'attachments'

    name = Column(String(256), nullable=False)
    projectId = Column(String(60), ForeignKey('projects.id'), nullable=False)
    authorId = Column(String(60), ForeignKey('users.id'), nullable=False)
