#!/usr/bin/env python3
"""Initializes the database session"""
from models.engine.db_storage import DBStorage

storage = DBStorage()
storage.reload()
