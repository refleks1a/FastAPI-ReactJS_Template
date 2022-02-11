#!/bin/sh -ex
# @see https://github.com/tiangolo/meinheld-gunicorn-docker/blob/master/docker-images/entrypoint.sh

export APP_MODULE=wsgi:app
export GUNICORN_CONF=/gunicorn_conf.py

exec su-exec "${APP_UID}:${APP_GID}" "$@"
