#!/usr/bin/env python3
"""RESTFUL API actions for threads"""

from api.v1.views import app_views
from models.thread import Thread
from models.project import Project
from flask import jsonify, request
from models import storage 


@app_views.route('/threads', methods=['POST'], strict_slashes=False)
def createThread():
    """Creates and stores a new thread in database"""
    threadData = request.get_json()
    if not threadData:
        return jsonify({"Error": "Not a JSON"}), 400

    requiredFields = ['topic', 'projectId']
    for field in requiredFields:
        if field not in threadData:
            return jsonify({"Error": f"{field} is missing"}), 400

    project = storage.get(Project, threadData['projectId'])
    if not project:
        return jsonify({"Error": "Project not found"}), 404

    thread = Thread(topic=threadData['topic'], projectId=threadData['projectId'])
    thread.save()

    return jsonify(thread.toDict()), 201
