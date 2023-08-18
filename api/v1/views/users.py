#!/usr/bin/env python3
"""RESTFUL API handler for user actions"""

from models import storage
from api.v1.views import app_views
from flask import request, make_response, abort, jsonify
from models.user import User
import bcrypt


@app_views.route('/users', strict_slashes=False)
def allUsers():
    """Returns a json list of all users"""
    users = []
    allUsers = storage.all(User)

    for user in allUsers.values():
        users.append(user.toDict())

    return make_response(jsonify(users), 200)


@app_views.route('/users/<user_id>')
def userById(user_id):
    """Retrieves the user with the user_id"""
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    return make_response(jsonify(user.toDict()), 200)


@app_views.route('/users', methods=['POST'], strict_slashes=False)
def createUser():
    """Creates a new user"""
    userInfo = request.get_json()
    if not userInfo:
        return make_response(jsonify({"Error": "Not a JSON"}), 400)

    requiredFields = ["name", "email", "password"]

    for field in requiredFields:
        if field not in userInfo:
            return make_response(jsonify(
                {"Error": f"{field} is missing"}), 400)

    allUsers = storage.all(User)

    for user in allUsers.values():
        if user.email == userInfo['email']:
            return make_response(jsonify({
                "Error": "An account with this email already exist"}), 400)

    hashedPassword = bcrypt.hashpw(userInfo['password'].encode('UTF-8'),
                                   bcrypt.gensalt())
    userInfo['password'] = str(hashedPassword, "UTF-8")
    user = User(**userInfo)
    user.save()

    return make_response(jsonify(user.toDict()), 201)

@app_views.route("/users/auth", methods=["POST"], strict_slashes=False)
def authenticateUser():
    """Authenticates user credentials"""
    authData = request.get_json()

    if not authData:
        return make_response(jsonify({"Error": "Not a JSON"}), 400)

    requiredFields = ["email", "password"]

    for field in requiredFields:
        if field not in authData:
            return make_response(jsonify({"Error": f"{field} is missing"}))

    user = storage.getByEmail(authData['email'])

    if not user:
        abort(404)

    knownPwd = user.password.encode('UTF-8')
    authPwd = authData['password'].encode('UTF-8')

    if bcrypt.checkpw(authPwd, knownPwd):
        user = user.toDict()
        user['loggedIn'] = True
        return make_response(jsonify(user), 200)
    
    return make_response(jsonify({"Error": "Incorrect password"}), 401)

@app_views.route('/users/<user_id>', methods=["PUT"], strict_slashes=False)
def updateUser(user_id):
    """Updates the user with user_id"""
    userData = request.get_json()

    if not userData:
        return make_response(jsonify({"Error": "Not a JSON"}), 400)
    
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    updateableFields = ["name", "email"]

    for key, value in userData.items():
        if key in updateableFields:
            setattr(user, key, value)

    user.save()

    return make_response(jsonify(user.toDict()), 200)

@app_views.route('/users/<user_id>', methods=['DELETE'], strict_slashes=False)
def deleteUser(user_id):
    """Deletes the user with user_id"""
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    storage.delete(user)

    return make_response(jsonify({}), 200)
