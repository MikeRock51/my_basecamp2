#!/usr/bin/env python3
"""RESTFUL API actions for threads"""

from api.v1.views import app_views
from models.thread import Thread
from models.project import Project
from flask import jsonify, request, abort
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

@app_views.route('/threads/<threadId>', strict_slashes=False)
def getThread(threadId):
    """Retrieves the thread from storage based on the threadID"""
    thread = storage.get(Thread, threadId)
    if not thread:
        abort(404)

    messages = []
    for message in thread.messages:
        messages.append(message.toDict())

    thread = thread.toDict()
    thread['messages'] = messages

    return jsonify(thread), 200


@app_views.route('/projects/<projectId>/threads', strict_slashes=False)
def getProjectThreads(projectId):
    """Retrieves all the threads of a project based on projectID"""
    project = storage.get(Project, projectId)
    if not project:
        abort(404)

    threads = []

    for thread in project.threads:
        messages = []
        for message in thread.messages:
            messages.append(message.toDict())
        thread = thread.toDict()
        thread['messages'] = messages
        threads.append(thread)

    return jsonify(threads), 200
