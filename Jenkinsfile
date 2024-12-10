pipeline {
    agent any
    
    stages {
        stage('Build Angular') {
            steps {
                script {
                    // Docker image setup
                    def angularImage = 'node:20-alpine'
                    
                    docker.image(angularImage).inside {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build a Docker image for the Angular app
                    sh 'docker build -t your-docker-image-name .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push the Docker image to your Docker registry
                    sh 'docker push your-docker-image-name'
                }
            }
        }
    }
}
