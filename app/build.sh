#!/bin/bash

die () {
    echo >&2 "$@"
    exit 1
}

[ "$#" -eq 1 ] || die "A tag is required as a parameter."

# Build, tag and push to Artifact Registry.
docker build -t dippapoc . --platform linux/amd64
docker tag dippapoc "europe-north1-docker.pkg.dev/dippapoc/dippapoc-docker-registry/app:$1"
docker push "europe-north1-docker.pkg.dev/dippapoc/dippapoc-docker-registry/app:$1"