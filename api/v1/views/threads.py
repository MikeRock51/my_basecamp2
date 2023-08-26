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
    thread = thread.toDict()
    thread['messages'] = []

    return jsonify(thread), 201

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

@app_views.route('/threads/<thread_id>', methods=['DELETE'], strict_slashes=False)
def deleteThread(thread_id):
    """Deletes the thread with the thread_id from storage"""
    thread = storage.get(Thread, thread_id)

    if not thread:
        abort(404)

    message = storage.get(Message, message_id)
    if not message:
        abort(404)

    storage.delete(message)

    return jsonify({}), 200


@app_views.route('/threads/<thread_id>', methods=['PUT'], strict_slashes=False)
def updateThread(thread_id):
    """Updates the topic of a thread"""
    threadData = request.get_json()
    if not threadData:
        return jsonify({"Error": "Not a JSON"}), 400

    if "topic" not in threadData:
        return jsonify({"Error": "Missing topic"}), 400

    thread = storage.get(Thread, thread_id)
    if not thread:
        abort(404)

    thread.topic = threadData['topic']

    messages = []
    for message in thread.messages:
        messages.append(message.toDict())

    thread = thread.toDict()
    thread['messages'] = messages

    return jsonify(thread), 200
