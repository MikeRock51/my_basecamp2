#!/usr/bin/env python3
"""Sets up views blueprint"""

from flask import Blueprint

app_views = Blueprint("app_views", __name__, url_prefix='/api/v1')


from api.v1.views.users import *
from api.v1.views.projects import *
from api.v1.views.attachments import *
from api.v1.views.threads import *
from api.v1.views.messages import *
