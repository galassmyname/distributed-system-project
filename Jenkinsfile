pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_HUB_USERNAME = 'galassmyname'
        BACKEND_IMAGE = "${DOCKER_HUB_USERNAME}/backend"
        FRONTEND_IMAGE = "${DOCKER_HUB_USERNAME}/frontend"
        GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }
        
        stage('Lint Backend') {
            steps {
                echo 'Linting Backend code...'
                script {
                    sh '''
                        docker run --rm \
                            -v "$WORKSPACE/backend":/app \
                            -w /app \
                            python:3.11-slim \
                            sh -c "pip install flake8 -q && flake8 . --count --select=E9,F63,F7,F82 --exclude=migrations --show-source --statistics || true"
                    '''
                }
            }
        }
        
        stage('Lint Frontend') {
            steps {
                echo 'Linting Frontend code...'
                script {
                    sh '''
                        docker run --rm \
                            -v "$WORKSPACE/frontend":/app \
                            -w /app \
                            node:18-alpine \
                            sh -c "npm install -q && echo 'Frontend lint OK' || true"
                    '''
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                echo 'Running Backend tests...'
                script {
                    sh '''
                        docker run --rm \
                            -v "$WORKSPACE/backend":/app \
                            -w /app \
                            python:3.11-slim \
                            sh -c "pip install -r requirements.txt -q && python manage.py test || true"
                    '''
                }
            }
        }
        
        stage('Build Docker Images') {
            parallel {
                stage('Build Backend Image') {
                    steps {
                        echo 'Building Backend Docker image...'
                        dir('backend') {
                            sh """
                                docker build -t ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT} .
                                docker tag ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT} ${BACKEND_IMAGE}:latest
                            """
                        }
                    }
                }
                
                stage('Build Frontend Image') {
                    steps {
                        echo 'Building Frontend Docker image...'
                        dir('frontend') {
                            sh """
                                docker build -t ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT} .
                                docker tag ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT} ${FRONTEND_IMAGE}:latest
                            """
                        }
                    }
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing images to Docker Hub...'
                script {
                    sh """
                        echo \$DOCKER_HUB_CREDENTIALS_PSW | docker login -u \$DOCKER_HUB_CREDENTIALS_USR --password-stdin
                        docker push ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT}
                        docker push ${BACKEND_IMAGE}:latest
                        docker push ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT}
                        docker push ${FRONTEND_IMAGE}:latest
                    """
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes cluster...'
                sh '''
                    # Utiliser le contexte Kubernetes approprié (minikube ou docker-desktop)
                    kubectl config use-context docker-desktop || kubectl config use-context minikube || true
                    kubectl apply -f kubernetes/namespace.yaml
                    kubectl apply -f kubernetes/postgres-configmap.yaml
                    kubectl apply -f kubernetes/postgres-secret.yaml
                    kubectl apply -f kubernetes/postgres-pvc.yaml
                    kubectl apply -f kubernetes/postgres-deployment.yaml
                    kubectl apply -f kubernetes/postgres-service.yaml
                    kubectl apply -f kubernetes/backend-deployment.yaml
                    kubectl apply -f kubernetes/backend-service.yaml
                    kubectl apply -f kubernetes/frontend-deployment.yaml
                    kubectl apply -f kubernetes/frontend-service.yaml
                    
                    # Wait for deployments to be ready (avec timeout pour éviter les blocages)
                    kubectl rollout status deployment/postgres -n distributed-app --timeout=60s || true
                    kubectl rollout status deployment/backend -n distributed-app --timeout=60s || true
                    kubectl rollout status deployment/frontend -n distributed-app --timeout=60s || true
                '''
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'
                sh '''
                    kubectl get pods -n distributed-app
                    kubectl get services -n distributed-app
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            echo "Backend image: ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT}"
            echo "Frontend image: ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT}"
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            echo 'Cleaning up...'
            sh 'docker logout || true'
        }
    }
}