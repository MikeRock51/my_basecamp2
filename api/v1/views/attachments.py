#!/usr/bin/env python3
"""Handles RESTFUL API actions for attachments"""

from models.attachment import Attachment
from api.v1.views import app_views
from flask import jsonify, request, current_app, send_from_directory, make_response
from werkzeug.utils import secure_filename
import os
from models import storage

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'gif'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app_views.route('/attachments', methods=['POST'], strict_slashes=False)
def upload_file():
    fileData = request.form.to_dict()

    requiredFields = ["projectId", "authorId"]

    for field in requiredFields:
        if field not in fileData:
            return jsonify({"Error": f"{field} is missing"}), 400

    if 'file' not in request.files:
        return jsonify({"Error": "File is missing"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"Error": "File is missing"}), 400

    if not file or not allowed_file(file.filename):
        return jsonify({"Error": "Unsupported format"}), 400

    UPLOAD_FOLDER = current_app.config['UPLOAD_FOLDER']
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    filename = secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_FOLDER, filename))
    attachment = Attachment(
        name=filename, projectId=fileData['projectId'],
        authorId=fileData['authorId'])
    attachment.save()
    return jsonify({"message": f"{filename} uploaded successfully"}), 201

@app_views.route('/attachments/<attachmentID>', strict_slashes=False)
def getAttachement(attachmentID):
    """Returns the attachment object with the attachmentID"""
    attachment = storage.get(Attachment, attachmentID)
    if not attachment:
        abort(404)

    return jsonify(attachment.toDict()), 200

@app_views.route('/attachments/<attachmentID>/file', strict_slashes=False)
def downloadAttachement(attachmentID):
    """Returns the attachment file with the attachmentID"""
    attachment = storage.get(Attachment, attachmentID)
    if not attachment:
        abort(404)

    UPLOAD_FOLDER = current_app.config['UPLOAD_FOLDER']

    response = make_response(send_from_directory(UPLOAD_FOLDER, attachment.name))
    response.headers['Content-Disposition'] = f'attachment; filename="{attachment.name}"'

    return response

@app_views.route('/attachments', strict_slashes=False)
def getAttachements():
    """Retrieves all attachment objects from storage"""
    attachments = storage.all(Attachment)
    attachmentList = []

    for attachment in attachments.values():
        attachmentList.append(attachment.toDict())
    
    return jsonify(attachmentList), 200

@app_views.route('/attachments/<attachmentID>', methods=['DELETE'], strict_slashes=False)
def deleteAttachement(attachmentID):
    """Deletes the attachment with the attachmentID from storage"""
    attachment = storage.get(Attachment, attachmentID)
    if not attachment:
        abort(404)

    storage.delete(attachment)
    return jsonify({}), 200
