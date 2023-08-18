#!/usr/bin/env python3
"""The attachments module"""

from sqlalchemy import Column, String, ForeignKey
from models.base_model import BaseModel, Base


class Attachment(BaseModel, Base):
    """Defines an Attachment object"""
    
