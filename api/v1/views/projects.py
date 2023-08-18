#!/usr/bin/env python3
"""RESTFUL API handler for project actions"""

from models import storage
from api.v1.views import app_views
from flask import request, make_response, abort, jsonify
from models.project import Project
from models.user import User
from models.member import Member


@app_views.route('/projects', strict_slashes=False)
def allProjects():
    """Retrieves all projects from database"""
    projects = storage.all(Project)
    projectList = []

    for project in projects.values():
        projectList.append(project.toDict())

    return make_response(jsonify(projectList), 200)

@app_views.route('/projects/<project_id>', strict_slashes=False)
def projectById(project_id):
    """Retrieves the project with the project_id from databse"""
    project = storage.get(Project, project_id)
    
    if not project:
        abort(404)

    return make_response(jsonify(project.toDict()))

@app_views.route('/projects/<project_id>', methods=['PUT'], strict_slashes=False)
def updateProject(project_id):
    """Updates the project with project_id"""
    projectData = request.get_json()

    if not projectData:
        return make_response(jsonify({"Error": "Not a valid JSON"}), 400)
 
    project = storage.get(Project, project_id)

    if not project:
        abort(404)

    editableFields = ["name", "description"]

    for field, value in projectData.items():
        if field in editableFields:
            setattr(project, field, value)
    
    if "member" in projectData:
        member = storage.getByEmail(projectData['member']['email'])
        if not member:
            return jsonify({"Error": "No user with this email"}), 404
        newMember = Member(**projectData['member'])
        project.members.append(newMember)

    project.save()

    return make_response(jsonify(project.toDict()), 200)

@app_views.route('/projects/<user_id>', methods=['POST'], strict_slashes=False)
def createProject(user_id):
    """Creates a new project"""
    projectData = request.get_json()

    if not projectData:
        return make_response(jsonify({"Error": "Not a valid JSON"}), 400)
    
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    requiredFields = ["name", "description"]

    for field in requiredFields:
        if field not in projectData:
            return make_response(
                jsonify({"Error": f"{field} is missing"}), 400)

    projectData['creatorId'] = user_id
    project = Project(**projectData)
    project.save()

    return make_response(jsonify(project.toDict()), 201)


@app_views.route('/users/projects/<user_id>', strict_slashes=False)
def fetchUserProjects(user_id):
    """Returns all projects created by the user with user_id""" 
    projects = storage.all(Project)
    userProjects = []

    for project in projects.values():
        if project.creatorId == user_id:
            userProjects.append(project.toDict())

    return make_response(jsonify(userProjects), 200)


@app_views.route('/users/projects/shared/<user_email>', strict_slashes=False)
def fetchSharedProjects(user_email):
    """Returns all projects where user with user_email is a member""" 
    projects = storage.all(Project)
    sharedProjects = []

    for project in projects.values():
        for member in project.members:
            if user_email == member.email:
                sharedProjects.append(project.toDict())

    return make_response(jsonify(sharedProjects), 200)


@app_views.route('/projects/<project_id>', methods=['DELETE'], strict_slashes=False)
def deleteProject(project_id):
    """Deletes the project with project_id from storage"""
    project = storage.get(Project, project_id)

    if not project:
        abort(404)

    storage.delete(project)

    return make_response(jsonify({}), 200)
