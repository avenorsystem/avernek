pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        IMAGE_REPOSITORY = 'avenor-website'
        // Dependencies image (Dockerfile.deps) reused as the app build base.
        DEPS_IMAGE = 'avenor-website-deps:latest'
        // BuildKit powers the cache mounts and secret mounts in the Dockerfile.
        DOCKER_BUILDKIT = '1'
        // Plain progress keeps the console log readable and greppable in CI.
        BUILDKIT_PROGRESS = 'plain'
        // Jenkins creates a temporary file containing the Secret file
        // credential and stores its path in ENV_FILE.
        ENV_FILE = credentials('website_secrets')
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Fetch environment') {
            steps {
                sh '''
                    set -eu
                    test -f "$ENV_FILE"
                    test -s "$ENV_FILE"
                    echo "Environment secret file is available."
                '''
            }
        }

        stage('Build dependencies image') {
            steps {
                sh '''
                    set -eu

                    # Dockerfile.deps installs node_modules into its own image.
                    # Docker's layer cache skips npm ci when the lockfile is
                    # unchanged, so this stage is a near no-op on most builds.
                    docker build \
                      --file Dockerfile.deps \
                      --provenance=false \
                      --sbom=false \
                      --tag "$DEPS_IMAGE" \
                      .
                '''
            }
        }

        stage('Build and validate app image') {
            steps {
                sh '''
                    set -eu

                    # Uses the prebuilt deps image as the build base.
                    # --provenance/--sbom=false: skip attestation manifests so
                    #   the export is faster and produces a plain single-arch
                    #   image (simpler for docker compose to consume).
                    # The Dockerfile's .next/cache mount persists Next.js's
                    #   incremental build cache, so repeat builds only recompile
                    #   what changed.
                    docker build \
                      --file Dockerfile \
                      --build-arg DEPS_IMAGE="$DEPS_IMAGE" \
                      --secret id=env_file,src="$ENV_FILE" \
                      --provenance=false \
                      --sbom=false \
                      --tag "$IMAGE_REPOSITORY:$BUILD_NUMBER" \
                      --tag "$IMAGE_REPOSITORY:latest" \
                      .

                    docker image inspect "$IMAGE_REPOSITORY:$BUILD_NUMBER" \
                      --format 'Built image {{.RepoTags}} ({{.Size}} bytes)'
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    set -eu
                    export ENV_FILE
                    export IMAGE_NAME="$IMAGE_REPOSITORY:$BUILD_NUMBER"
                    docker compose up --detach --no-build --remove-orphans
                '''
            }
        }
    }

    post {
        always {
            deleteDir()
        }
    }
}
