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
                sh 'docker system prune -af'
                sh '(docker volume rm $(docker volume ls -q)) | true'
            }
        }
    }
}