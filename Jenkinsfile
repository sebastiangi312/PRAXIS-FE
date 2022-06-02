pipeline {
    agent any
    tools{
        dockerTool  'mydocker'
    }
    environment  {
        DOCKERHUB_CREDENTIALS = credentials('segiraldovi-Dockerhub')
    }
    stages {
        
        stage('Cleaning previous Test') {
            steps {
               sh '''
                  docker stop backend_ft || true
                  docker stop frontend_ft || true
                  docker container prune -f
               '''
               sh '''
                  docker image rm -f segiraldovi/my_back || true
                  docker image rm -f segiraldovi/my_front || true
               '''
            }
        }

        stage('Cloning Repo') {
            steps {
                checkout scm
                sh 'docker container ls'
                sh 'docker image ls'
                sh 'docker volume ls'
            }
        }
        
        stage('Building Image') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Pushing'){
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin '
                sh 'docker push segiraldovi/my_front:latest'
            }
        }
    }
    post {
        always {
        sh 'docker logout'

        }
    }
}