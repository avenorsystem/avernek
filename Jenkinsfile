pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    environment {
        IMAGE_REPOSITORY = 'avenor-website'
        DOCKER_BUILDKIT = '1'
    }

    stages {
        stage('Install and test') {
            steps {
                sh '''
                    set -eu
                    npm ci
                    npm run lint
                '''
            }
        }

        stage('Build image') {
            steps {
                withCredentials([file(credentialsId: 'website_secrets', variable: 'ENV_FILE')]) {
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
        }

        stage('Deploy') {
            steps {
                withCredentials([file(credentialsId: 'website_secrets', variable: 'ENV_FILE')]) {
                    sh '''
                        set -eu
                        export ENV_FILE
                        export IMAGE_NAME="$IMAGE_REPOSITORY:$BUILD_NUMBER"
                        docker compose up --detach --no-build --remove-orphans
                    '''
                }
            }
        }
    }

    post {
        always {
            deleteDir()
        }
    }
}
