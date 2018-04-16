def compose = "docker-compose"
def environment = "natsexample"

pipeline {
  agent { 
    label 'docker'
  }

  options {
    timeout(time: 20, unit: 'MINUTES')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      steps {
        sh "${compose} -p ${environment} build --pull"
      }
    }

    stage('Label and Push') {
      steps {
        labelAndPush(environment)
      }
    }

    stage('Deploy') {
      steps {
        deployToRancher()
      }
    }
  }

  post {
    always {
      sh "${compose} -p ${environment} down"
    }
  }
}

def labelAndPush(environment) {
  tagImages(environment, 'latest')
  pushToDockerhub('latest')
}

def tagImages(environment, version) {
  sh "docker tag ${environment}_frontend mrako/nats-example_frontend:${version}"
  sh "docker tag ${environment}_publisher mrako/nats-example_publisher:${version}"
  sh "docker tag ${environment}_subscriber mrako/nats-example_subscriber:${version}"
}

def pushToDockerhub(version) {
  sh "docker push mrako/nats-example_frontend:${version}"
  sh "docker push mrako/nats-example_publisher:${version}"
  sh "docker push mrako/nats-example_subscriber:${version}"
}

def deployToRancher() {
  upgradeEnvironment('nats-example', 'swarm')
}

def upgradeEnvironment(environment, version) {
  def rancher = ". /home/jenkins/.env && ~/bin/rancher-compose -f docker-compose.${version}.yml -p ${environment} up -d"
  def services = "frontend publisher subscriber"

  sh "${rancher} --confirm-upgrade ${services}"
  sh "${rancher} --force-upgrade --pull ${services}"
}
