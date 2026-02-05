pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.0-jammy'
            args '--user root'
        }
    }
    tools {
        nodejs 'NodeJS'
    }

    environment {
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '0'
    }

    stages {
        stage('Set JAVA_HOME') {
            steps {
                sh '''
                    export JAVA_HOME=$(dirname $(readlink -f $(which java)))
                '''
            }
        }

        stage('Cleanup') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                echo 'Checking out code from Git'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies'
                sh 'npm ci'
            }
        }

        stage('Run tests') {
            steps {
                echo 'Running all tests'
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            echo 'Generating Allure report'

            allure([
                includeProperties: false,
                results: [[path: 'allure-results']]
            ])
        }
        success {
            echo 'Pipeline Completed Successfully'
        }
        failure {
            echo 'Pipeline Failed'
        }
    }
}
