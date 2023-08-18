#!/usr/bin/env python3
"""The database storage engine"""

from os import getenv
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from typing import Dict


class DBStorage:
    """Database storage class"""
    __engine = None
    __session = None

    def __init__(self) -> None:
        user = getenv("BASECAMP_USER")
        host = getenv("BASECAMP_HOST")
        pwd = getenv("BASECAMP_PWD")
        db = getenv("BASECAMP_DB")

        self.__engine = create_engine(
            f"mysql+mysqldb://{user}:{pwd}@{host}/{db}",
            pool_pre_ping=True)

    def reload(self) -> None:
        """
            Creates all database table if not
            exists and establishes a new session
        """
        from models.base_model import Base
        allModels = self.allModels()

        Base.metadata.create_all(self.__engine)
        sessionFactory = sessionmaker(bind=self.__engine,
                                      expire_on_commit=False)
        self.__session = scoped_session(sessionFactory)

    def allModels(self) -> Dict:
        """Returns a dictionary of all app models"""
        from models.user import User
        from models.project import Project
        from models.member import Member
        from models.attachment import Attachment
        from models.thread import Thread
        from models.message import Message

        return {
            "User": User,
            "Project": Project,
            "Member": Member
        }
    
    def all(self, obj=None) -> Dict:
        """
            Retrieves all instances of obj or all entries from
            database if obj is None
        """
        objects = {}
        
        if obj:
            query = self.__session.query(obj).all()

            for result in query:
                key = f"{result.__class__.__name__}.{result.id}"
                objects[key] = result
        else:
            models = self.allModels()
            for model in models.values():
                query = self.__session.query(model).all()
                for result in query:
                    key = f"{result.__class__.__name__}.{result.id}"
                    objects[key] = result

        return objects

    def new(self, obj) -> None:
        """Adds the given object to the current session"""
        self.__session.add(obj)

    def save(self) -> None:
        """Commits the state of the current session to database"""
        self.__session.commit()

    def delete(self, obj=None) -> None:
        """Deletes obj from the current session and database"""
        if obj:
            self.__session.delete(obj)
            self.save()

    def get(self, cls, id: str):
        """
            Retrieves the cls instance with the given id
            or None if no instance was found
        """
        models = self.allModels()

        if cls not in models.values():
            return None
        
        instances = self.all(cls)

        for instance in instances.values():
            if instance.id == id:
                return instance

    def getByEmail(self, email: str):
        """Retrieves the user with the given email from database"""
        User = self.allModels()['User']
        users = self.all(User)

        for user in users.values():
            if user.email == email:
                return user

    def close(self) -> None:
        """Removes the current session"""
        self.__session.remove()
