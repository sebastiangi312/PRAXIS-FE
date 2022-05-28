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
                sh '(docker ps -aq | xargs docker stop | xargs docker rm) | true'
            }
        }

        stage('Cloning Repo') {
            steps {
                checkout scm
            }
        }
        
        stage('Building Image') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Running Tests'){
            steps {
                sh 'echo Testing UwU'
                
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