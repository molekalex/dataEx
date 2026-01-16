pipeline{
    stages(){

        stage('stage 1 -create playwright container'){
            steps{
                echo 'creating playwright docker containers..'
                //a la maldita sea... still detached mode...
                bat "docker run mcr.microsoft.com/playwright:v1.54.1-noble -d"

                //option2 classic way:running the container from a .yaml file 
                //optionX given by IA:
                //bat "docker run -it -d --name=playwright-container -v %cd%:/home/playwright/project -w /home/playwright/project mcr.microsoft.com/playwright:v1.54.1-noble tail -f /dev/null"
            }
        }
        stage('stage 2 - Execute the tests'){
            steps{
                echo 'Executing the tests....'
                bat 'npx playwright dataEx'

            }
        }
        stage('stage 3 - Deploy'){
            steps{
                echo 'Deploying....'
            }
        }
    }
}