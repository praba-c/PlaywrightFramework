pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }

    environment {
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '0'
    }

    stages {
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

        stage('Install Playwright Browsers') {
            steps {
                echo 'Installing Playwright browsers'
                sh 'npx playwright install --with-deps'
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
