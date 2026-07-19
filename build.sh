#!/usr/bin/env sh
# Build the dependencies image (Dockerfile.deps) and then the application image
# (Dockerfile), mirroring the Jenkins pipeline for local use. Docker's layer
# cache means the deps step is a near no-op when the lockfile is unchanged.
#
# Usage:
#   ./build.sh                       # builds avenor-website:local
#   APP_IMAGE=foo:1 ./build.sh       # override the app image tag
#   ENV_FILE=.env.local ./build.sh   # mount env file as the build secret
set -eu

DEPS_IMAGE="${DEPS_IMAGE:-avenor-website-deps:latest}"
APP_IMAGE="${APP_IMAGE:-avenor-website:local}"
ENV_FILE="${ENV_FILE:-.env.local}"

export DOCKER_BUILDKIT=1

echo ">> Building dependencies image: $DEPS_IMAGE"
docker build \
  --file Dockerfile.deps \
  --provenance=false \
  --sbom=false \
  --tag "$DEPS_IMAGE" \
  .

echo ">> Building application image: $APP_IMAGE"
secret_arg=""
if [ -f "$ENV_FILE" ]; then
  secret_arg="--secret id=env_file,src=$ENV_FILE"
fi

# shellcheck disable=SC2086
docker build \
  --file Dockerfile \
  --build-arg DEPS_IMAGE="$DEPS_IMAGE" \
  $secret_arg \
  --provenance=false \
  --sbom=false \
  --tag "$APP_IMAGE" \
  .

echo ">> Built $APP_IMAGE"
