pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        IMAGE_REPOSITORY = 'avenor-website'
        DOCKER_BUILDKIT = '1'
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

        stage('Build and validate with Docker') {
            steps {
                sh '''
                    set -eu
                    docker build \
                      --secret id=env_file,src="$ENV_FILE" \
                      --tag "$IMAGE_REPOSITORY:$BUILD_NUMBER" \
                      --tag "$IMAGE_REPOSITORY:latest" \
                      .
                    docker image inspect "$IMAGE_REPOSITORY:$BUILD_NUMBER" \
                      --format='Built image {{.RepoTags}} ({{.Size}} bytes)'
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
