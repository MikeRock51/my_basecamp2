#!/usr/bin/env python3
"""Defines common features and attributes for all models"""

from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, DateTime
from uuid import uuid4
from datetime import datetime
from models import storage
from typing import Dict
from copy import copy


Base = declarative_base()


class BaseModel():
    """Parent model for other models"""
    id = Column(String(60), primary_key=True, nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)

    def __init__(self, *args, **kwargs) -> None:
        """Object Constructor"""
        if kwargs:
            for key, value in kwargs.items():
                if key != '__class__':
                    if key in ['updatedAt', 'createdAt']:
                        setattr(self, key, datetime.fromisoformat(value))
                    else:
                        setattr(self, key, value)
        self.id = str(uuid4())
        self.createdAt = datetime.now()
        self.updatedAt = datetime.now()

    def __str__(self) -> str:
        """Returns a string representation of an instance"""
        return ("[{}] ({}) {}".format
                (type(self).__name__, self.id, self.__dict__))

    def save(self) -> None:
        """Saves the current instance to storage"""
        self.updatedAt = datetime.now()
        storage.new(self)
        storage.save()

    def delete(self) -> None:
        """Deletes the current instance from storage"""
        storage.delete(self)

    def toDict(self) -> Dict:
        """Returns a dictionary representation of the current instance"""
        instance = copy(self.__dict__)
        instance['__class__'] = type(self).__name__
        instance['createdAt'] = instance['createdAt'].isoformat()
        instance['updatedAt'] = instance['updatedAt'].isoformat()

        if instance.get('_sa_instance_state'):
            del instance['_sa_instance_state']

        if type(self).__name__ == 'Project':
            members = []
            for member in self.members:
                members.append(member.toDict())
            instance['members'] = members

        if type(self).__name__ == 'User':
            projects = []
            for project in self.projects:
                project = project.toDict()
                project['author'] = self.email
                projects.append(project)
            instance['projects'] = projects

        return instance
