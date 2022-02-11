#!/usr/bin/env sh

# Let the DB start
echo "Waiting for PostgreSQL"
while ! nc -z ${POSTGRES_HOST} ${POSTGRES_PORT} ; do
  echo "PostgreSQL is not yet available, sleeping"
  sleep 1
done
echo "PostgreSQL started"

# Run DB creation and migrations
# execute only when needed (once per environment creation or on demand)

function query_psql {
  # @see https://stackoverflow.com/questions/28451598/how-to-return-a-value-from-psql-to-bash-and-use-it
  # -t only tuple
  # -A output not unaligned
  # -q quiet
  # -X Don't run .psqlrc file
  PGPASSWORD=${POSTGRES_PASSWORD} psql -qtAX -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER} ${POSTGRES_DB} -c "$1"
}

function restore_dump_psql {
  PGPASSWORD=${POSTGRES_PASSWORD} psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER} -W -f db-dump/qualis2new.sql ${POSTGRES_DB}
}

#
# 1. Get currently installed database dump version from the database
# 2. Get the latest available database dump version from the file backend/db-dump/dump-version.txt
# 3. Make a comparison.
#
# If no dump is currently installed or the latest version is newer than the installed one we want to:
# a. remove all data in the database
# b. install the dump and
# c. save the currently installed dump version to the latest available
# (the corresponding table is created within the dump)
#
# To make the dump version human readable we use the timestamp representation in yyyy-mm-ddThh-mm-ss format.
#
# To save the currently installed dump version this script creates the table
# bdd_version with version text column

dump_installed_version=$(query_psql "SELECT version FROM bdd_version WHERE id = 1" || : | tr '\n' ' ' | xargs)
dump_latest_version=$(cat /app/db-dump/dump-version.txt | tr '\n' ' ' | xargs)

# @see https://stackoverflow.com/a/52707989 for expr usage example
if [ -z "$dump_installed_version" ] || [ $(expr "$dump_latest_version" \> "$dump_installed_version") = 1 ] ; then
  echo "Dropping public schema..."
  query_psql "DROP SCHEMA public CASCADE"

  echo "Creating public schema..."
  query_psql "CREATE SCHEMA public"

  echo "Activating uuid-ossp extension so that Postgres generates automatically the UUIDs upon migrations"
  query_psql "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\" with SCHEMA public"

  echo "Restore DB dump"
  restore_dump_psql

  echo "Deleting version record in DB"
  query_psql "DELETE FROM bdd_version WHERE id = 1"

  echo "Saving the current dump version ${dump_latest_version} into the DB"
  query_psql "INSERT INTO bdd_version VALUES (1, '$dump_latest_version')"

  # TODO: remove once database is not wiped upon each deployment
  # if [ "X${QUALIS_ENV}" = "Xproduction" ] ; then
  #   echo "Fixing production configuration for the default test S3 storage configuration"
  #   query_psql "UPDATE s3_storage_configuration SET s3_endpoint_external='api.ppqbt.fr', s3_access_key='access-key-680585fd-f263-451d-82e5-0f6b48347649', s3_secret_key='minio-secret-key-3af2e146-cb39-4f1c-97d8-f74c9183e4d8' WHERE id = 1"
  # fi
fi
