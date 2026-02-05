pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }

    environment {
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '0'
    }

    stages {
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

        stage('Run tests (Docker)') {
            steps {
                echo 'Running all tests'
                sh '''
                    docker run --rm \
                    --user root \
                    -v "$PWD:/work" \
                    -w /work \
                    mcr.microsoft.com/playwright:v1.58.o-jammy \
                    bash -c "
                        npm ci &&
                        npx playwright install --with-deps &&
                        npx playwright test
                    "
                '''
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
