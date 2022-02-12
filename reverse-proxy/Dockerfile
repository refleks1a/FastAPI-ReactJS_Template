# syntax = docker/dockerfile:experimental
# @see https://fr.slideshare.net/jucrouzet/meetup-optimiser-ses-builds-docker-avec-buildkit
# @see https://stackoverflow.com/questions/58018300/using-a-pip-cache-directory-in-docker-builds
#
# @see https://serverfault.com/questions/577370/how-can-i-use-environment-variables-in-nginx-conf
# @see https://medium.com/@sean_bradley/auto-devops-with-gitlab-ci-and-docker-compose-f931233f080f
FROM nginx:1.19.2-alpine

# tzdata = to be able to set the correct timezone
ARG rundeps="tzdata"

# install apk dependencies
RUN --mount=type=cache,target=/var/cache/apk \
    apk update \
    && apk --progress add $rundeps

# copy nginx config to expose frontend and api
# this is a template file that is processed upon startup via envsubst
COPY nginx/nginx.conf.template /etc/nginx/nginx.conf.template

COPY docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
