pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-1"
        AWS_ACCOUNT_ID = "820171506892"

        ECR_REPO_BACKEND = "820171506892.dkr.ecr.us-east-1.amazonaws.com/backend"
        ECR_REPO_FRONTEND = "820171506892.dkr.ecr.us-east-1.amazonaws.com/frontend"

        IMAGE_TAG = "v4.0.${BUILD_NUMBER}"
        KUBE_NAMESPACE = "projectns"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/Nehabisen21/Final-Devops-Project.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh """
                docker build -t backend:${IMAGE_TAG} backend/
                """
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh """
                docker build -t frontend:${IMAGE_TAG} frontend/
                """
            }
        }

        stage('Login to AWS ECR') {
            steps {
                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'aws-creds']
                ]) {
                    sh '''
                    aws ecr get-login-password --region us-east-1 |
                    docker login --username AWS --password-stdin \
                    820171506892.dkr.ecr.us-east-1.amazonaws.com
                    '''
                }
            }
        }

        stage('Push Images to ECR') {
            steps {
                sh """
                docker tag backend:${IMAGE_TAG} \
                820171506892.dkr.ecr.us-east-1.amazonaws.com/backend:${IMAGE_TAG}
                docker push \
                820171506892.dkr.ecr.us-east-1.amazonaws.com/backend:${IMAGE_TAG}

                docker tag frontend:${IMAGE_TAG} \
                820171506892.dkr.ecr.us-east-1.amazonaws.com/frontend:${IMAGE_TAG}
                docker push \
                820171506892.dkr.ecr.us-east-1.amazonaws.com/frontend:${IMAGE_TAG}
                """
            }
        }

        stage('Deploy Backend to Kubernetes') {
            steps {
                sh """
                sed -i 's|IMAGE_TAG|${IMAGE_TAG}|g' Kubernetes/backend-deployment.yaml
                kubectl apply -f Kubernetes/backend-deployment.yaml -n projectns
                """
            }
        }

        stage('Deploy Frontend to Kubernetes') {
            steps {
                sh """
                sed -i 's|IMAGE_TAG|${IMAGE_TAG}|g' Kubernetes/frontend-deployment.yaml
                kubectl apply -f Kubernetes/frontend-deployment.yaml -n projectns
                """
            }
        }
    }

    post {
        success {
            echo "Frontend & Backend deployed successfully with tag ${IMAGE_TAG}"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}
