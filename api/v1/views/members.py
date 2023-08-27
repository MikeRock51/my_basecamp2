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
