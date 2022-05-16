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
                sh(returnStdout: true, script: '''#!/bin/bash
                    if [[ "$(docker container ls | grep frontend )" != "" ]] ; then
                        docker stop frontend
                        docker rm frontend
                    fi
                    '''.stripIndent()
                )
                
                sh(returnStdout: true, script: '''#!/bin/bash
                    if [[ "$(docker container ls | grep backend )" != "" ]] ; then
                        docker stop backend
                        docker rm backend
                    fi
                    '''.stripIndent()
                )
                sh(returnStdout: true, script: '''#!/bin/bash
                    if [[ "$(docker container ls | grep my-postgres )" != "" ]] ; then
                        docker stop my-postgres
                        docker rm my-postgres
                    fi
                    '''.stripIndent()
                )
            }
        }

        stage('Creating Subnets and Cloning Repo') {
            steps {
                checkout scm
                sh(returnStdout: true, script: '''#!/bin/bash
                    if [[ "$(docker network ls | grep my-network )" == "" ]] ; then
                        docker network create --subnet=122.23.0.0/16 my-network 
                    fi
                    '''.stripIndent()
                )
            }
        }
        
        stage('Building Image') {
            steps {
                sh 'docker build -t my_front --target build .'
            }
        }

        stage('Running Postgres and testing Code'){
            steps {
                sh 'docker run --name my-postgres --network="my-network" --ip 122.23.0.2 -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres'
                sh 'docker run --rm --network="my-network" --ip 122.23.0.3 -p 8081:8081 -e DB_URL=122.23.0.2:5432 --name  backend segiraldovi/my_back mvn spring-boot:run'
                sh 'docker run --rm --network="my-network" --ip 122.23.0.4 -p 4200:4200 --name frontend  -d my_front npm start'
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