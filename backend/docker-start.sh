#!/bin/sh -ex
# @see https://github.com/tiangolo/meinheld-gunicorn-docker/blob/master/docker-images/start.sh

# This script is already run under defined UID/GID thanks to the entrypoint.sh

# If there's a prestart.sh script in the /app directory, run it before starting
PRE_START_PATH=/app/docker-prestart.sh
echo "Checking for script in $PRE_START_PATH"
if [ -f $PRE_START_PATH ] ; then
    echo "Running script $PRE_START_PATH"
    chmod a+x "$PRE_START_PATH" || :
    . "$PRE_START_PATH" || :
else
    echo "There is no script $PRE_START_PATH"
fi

# Start Gunicorn
# $GUNICORN_CONF and $APP_MODULE are defined in entrypoint.sh
if [ "X${QUALIS_ENABLE_MEINHELD}" = "X1" ] ; then
    exec gunicorn -k egg:meinheld#gunicorn_worker -c "$GUNICORN_CONF" "$APP_MODULE"
else
    exec gunicorn -c "$GUNICORN_CONF" "$APP_MODULE"
fi
