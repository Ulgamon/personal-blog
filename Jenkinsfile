pipeline {
    agent any
    tools {
        nodejs "NODE22"
    }
    environment {
        S3_BUCKET_URL = credentials("s3-bucket-name-blog")
        CF_DISTRIBUTION_ID = credentials("cloudfront-distribution-id-blog")
    }
    stages {
        stage("Fetch code") {
            steps {
                git branch: "main", url: "https://github.com/Ulgamon/personal-blog.git"
            }
        }

        stage("Install Dependencies") {
            steps {
                sh "npm install"
            }
        }

        stage("Build") {
            steps {
                sh "npm run build"
            }
        }

        // stage("Test") {
        //     steps {
        //         sh "npm run test"
        //     }
        // }

        // stage("Run Linter") {
        //     steps {
        //         sh "npm run lint"
        //     }
        // }

        // stage("Sonar Code Analysis") {
        //     environment {
        //         scannerHome = tool 'sonar7.2'
        //     }
        //     steps {
        //         withSonarQubeEnv('sonarqubeserver') {
        //             sh '''${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=algo-observer \
        //                 -Dsonar.projectName=algo-observer \
        //                 -Dsonar.projectVersion=1.0 \
        //                 -Dsonar.sources=src'''
        //         }
        //     }
        // }

        // stage("Quality Gate") {
        //     steps {
        //         timeout(time: 1, unit: 'HOURS') {
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }
        // }

        stage("Delete Items From S3 Bucket") {
            steps {
                withAWS(credentials: "AWSFrontendUser2", region: "eu-central-1") {
                    sh "aws s3 rm ${S3_BUCKET_URL} --recursive"
                }
            }
        }

        stage("Download Items to S3 Bucket") {
            steps {
                withAWS(credentials: "AWSFrontendUser2", region: "eu-central-1") {
                    sh "aws s3 cp ./dist ${S3_BUCKET_URL} --recursive"
                }
            }
        }
        
        stage("Invalidate CloudFront Cache") {
            steps {
                withAWS(credentials: "AWSFrontendUser2", region: "eu-central-1") {
                    sh "aws cloudfront create-invalidation --distribution-id ${CF_DISTRIBUTION_ID} --paths '/*'"
                }
            }
        }
    }
}