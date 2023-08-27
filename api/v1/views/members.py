#!/usr/bin/env python3
"""RESTFUL API actions for members"""

from api.v1.views import app_views
from flask import request, jsonify
from models import storage
from models.project import Project
from models.member import Member


@app_views.route('/projects/<project_id>/members', strict_slashes=False)
def getProjectMembers(project_id):
    """Retrieves all members of a project with the projectID"""
    project = storage.get(Project, project_id)
    if not project:
        abort(404)

    members = []
    for member in project.members:
        members.append(member.toDict())

    return jsonify(members), 200

@@app_views.route('/members>', methods=['PUT'], strict_slashes=False)
def updateMember():
    """Update the admin status of a member on a project"""
    reqData = request.get_json()
    if not reqData:
        return jsonify({"Error": "Not a JSON"}), 200

    requiredFields = ["projectId", "id", "isAdmin"]
    for field in requiredFields:
        if not field in reqData:
            return jsonify({"Error": f"{field} is missing"}), 400

    project = storage.get(Project, reqData.projectId)
    if not project:
        abort(404)

    member = storage.get(Member, reqData.id)
    if not member:
        abort(404)

    member.isAdmin = reqData.isAdmin
    member.save()

    return jsonify(member.toDict()
