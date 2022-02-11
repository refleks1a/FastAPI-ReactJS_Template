# syntax = docker/dockerfile:experimental
# @see https://fr.slideshare.net/jucrouzet/meetup-optimiser-ses-builds-docker-avec-buildkit
# @see https://stackoverflow.com/questions/58018300/using-a-pip-cache-directory-in-docker-builds
#
# @see https://github.com/tiangolo/meinheld-gunicorn-flask-docker
# @see https://github.com/tiangolo/meinheld-gunicorn-docker/blob/master/docker-images/python3.8-alpine3.11.dockerfile
FROM python:3.8.5-alpine3.11

# runtime dependencies
# wkhtmltopdf -- pdf generation utility
# libpq -- postgresql python library dependency
# postgresql-client -- pg_dump, pg_restore, psql, etc.
ARG rundeps="wkhtmltopdf libpq postgresql-client tzdata su-exec libmagic"

# build-time dependencies (for pip)
# we will delete these depedencies in the end to keep the image smaller
ARG builddeps="gcc make libc-dev libffi-dev postgresql-libs musl-dev postgresql-dev"

ENV PYTHONPATH /app

# This prevents Python from writing out pyc files
ENV PYTHONDONTWRITEBYTECODE 1

# This keeps Python from buffering stdin/stdout
ENV PYTHONUNBUFFERED 1

# Working directory within the virtualized Docker environment
WORKDIR /app

########################################################################################################################
# This image will check how many CPU cores are available in the current server running your container.
# It will set the number of workers to the number of CPU cores multiplied by this value.
# ENV WORKERS_PER_CORE 1
#
# Override the automatic definition of number of workers.
# ENV WEB_CONCURRENCY
#
# The "host" used by Gunicorn, the IP where Gunicorn will listen for requests.
# ENV HOST
#
# The port the container should listen on.
ENV PORT 8080
#
# The actual host and port passed to Gunicorn. By default, set based on the variables HOST and PORT.
# ENV BIND
#
# The log level for Gunicorn. By default, set to info.
# ENV LOG_LEVEL
########################################################################################################################

EXPOSE 8080

# copy application files into the container
COPY requirements.txt /app

# install apk dependencies
# ttf-ubuntu-font-family is needed for pdf generation with wkhtmltopdf
RUN --mount=type=cache,target=/var/cache/apk \
    --mount=type=cache,target=/root/.cache/pip \
    apk update \
    && apk --progress add $rundeps $builddeps \
    && pip install -r requirements.txt \
    && apk del $builddeps \
    && apk --update add ttf-ubuntu-font-family wkhtmltopdf
    

# use virtual environment to be able to use IDE during the development
# RUN python -m venv env && source env/bin/activate

#
COPY ./docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

#
COPY ./docker-start.sh /start.sh
RUN chmod +x /start.sh

#
COPY ./docker-gunicorn_conf.py /gunicorn_conf.py

# copy application files into the container
COPY . /app

ENTRYPOINT ["/entrypoint.sh"]

# Run the start script, it will check for an /app/prestart.sh script (e.g. for migrations)
# And then will start Gunicorn with Meinheld
CMD ["/start.sh"]
