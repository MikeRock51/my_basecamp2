#!/usr/bin/env python3
"""The message module"""

from base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey


class Message(BaseModel, Base):
    """Defines a Message object"""
    __tablename__ = "messages"

    sender = Column(String(128), nullable=False)
    message = Column(String(2048), nullable=False)
    threadId = Column(String(60), ForeignKey("threads.id"), nullable=False)
