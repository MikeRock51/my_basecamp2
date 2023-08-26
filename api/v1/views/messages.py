#!/usr/bin/env python3
"""RESTFUL API actions for messages"""

from flask import jsonify, request, abort
from models import storage
from models.message import Message
from models.thread import Thread
from api.v1.views import app_views


@app_views.route('/messages', methods=['POST'], strict_slashes=False)
def createMessage():
    """Creates a new message"""
    messageData = request.get_json()
    if not messageData:
        return jsonify({"Error": "Not a JSON"}), 400

    requiredFields = ['sender', 'message', 'threadId']
    for field in requiredFields:
        if field not in messageData:
            return jsonify({"Error": f"{field} is missing"}), 400

    thread = storage.get(Thread, messageData['threadId'])
    if not thread:
        return jsonify({"Error": "Thread not found"}), 404

    newMessage = Message(**messageData)
    newMessage.save()

    return jsonify(newMessage.toDict()), 201

@app_views.route('/messages/<thread_id>/<message_id>', methods=['DELETE'], strict_slashes=False)
def deleteMessage(thread_id, message_id):
    """Deletes the message with the thread_id from storage"""
    thread = storage.get(Thread, thread_id)

    if not thread:
        abort(404)

    storage.delete(thread)

    return jsonify({}), 200
