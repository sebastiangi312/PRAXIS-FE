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
                sh 'docker image prune --all --force '
                sh(returnStdout: true, script: '''#!/bin/bash
                    if [[ "$(docker ps -a | grep segiraldovi/my_front )" != "" ]] ; then
                        docker stop segiraldovi/my_front
                        docker rm -f segiraldovi/my_front
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
                    if [[ "$(docker ps -a | grep my-postgres )" != "" ]] ; then
                        docker stop my-postgres
                        docker rm -f my-postgres
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
                sh 'docker build -t segiraldovi/my_front --target build .'
            }
        }

        stage('Running Postgres and Data'){
            steps {
                sh 'docker run --name my-postgres --network="my-network" --ip 122.23.0.2 -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres'
                sh 'docker run --rm --network="my-network" --ip 122.23.0.3 -p 8081:8081 -e DB_URL=122.23.0.2:5432 --name  backend -d segiraldovi/my_back mvn spring-boot:run'
                sh 'docker run --rm --network="my-network" --ip 122.23.0.4 -p 4200:4200 --name my_front -d segiraldovi/my_front npm start'
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