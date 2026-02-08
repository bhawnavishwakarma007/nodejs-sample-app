# Node.js Dockerized Application with CI/CD Deployment to AWS EC2

---

## Overview

This project demonstrates a complete DevOps workflow:

- Simple Node.js web application
- Containerized using Docker
- Deployed on AWS EC2
- Automated deployment using GitHub Actions CI/CD
- Push to GitHub automatically rebuilds and redeploys the container

---

## Architecture

    Developer Push
          │
          ▼
    GitHub Repository
          │
          ▼
    GitHub Actions Pipeline
          │
          ▼
    SSH into EC2 Instance
          │
          ▼
    Pull Latest Code
          │
          ▼
    Docker Build
          │
          ▼
    Restart Container
          │
          ▼
    Public Access via EC2 Public IP

---

## Application

The Node.js server serves:

- A web UI page
- A backend health API endpoint

### Endpoint

    GET /status

Returns container health status.

---

## Project Structure

    nodejs-sample-app/
    │
    ├── index.js
    ├── package.json
    ├── package-lock.json
    ├── Dockerfile
    └── .github/
        └── workflows/
            └── deploy.yml

---

## Node.js Server

The application:

- Serves HTML UI
- Calls backend API using fetch
- Verifies Docker container is running

---

## Docker Configuration

### Dockerfile

    FROM node:18
    
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    
    EXPOSE 81
    
    CMD ["node", "index.js"]

---

## Run Locally

Install dependencies:

    npm install

Start server:

    node index.js

Open:

    http://localhost:81

---

## Run Using Docker

Build image:

    docker build -t devops-node-app .

Run container:

    docker run -d -p 81:81 --name nodeapp devops-node-app

---

## AWS EC2 Setup

Install required packages:

    sudo apt update
    sudo apt install docker.io git -y
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker ubuntu
    newgrp docker

Clone repository:

    git clone https://github.com/<your-username>/nodejs-sample-app.git
    cd nodejs-sample-app

---

## Security Group Configuration

Allow inbound rule:

| Type       | Port | Source    |
|-----------|----|--------|
| Custom TCP | 81 | 0.0.0.0/0 |

Access application:

    http://<EC2_PUBLIC_IP>:81

---

## CI/CD Pipeline (GitHub Actions)

Pipeline automatically deploys on every push to main branch.

Workflow File:

    .github/workflows/deploy.yml

    name: Deploy Node App to EC2
    
    on:
      push:
        branches: [ "main" ]
    
    jobs:
      deploy:
        runs-on: ubuntu-latest
    
        steps:
        - name: Checkout Code
          uses: actions/checkout@v4
    
        - name: Deploy to EC2
          uses: appleboy/ssh-action@v1.0.3
          with:
            host: ${{ secrets.EC2_HOST }}
            username: ${{ secrets.EC2_USER }}
            key: ${{ secrets.EC2_SSH_KEY }}
            script: |
              cd ~/nodejs-sample-app
              git pull origin main
              docker stop nodeapp || true
              docker rm nodeapp || true
              docker build -t devops-node-app .
              docker run -d -p 81:81 --name nodeapp devops-node-app

---

## GitHub Secrets

Add repository secrets:

| Secret Name | Description |
|-----------|------|
| EC2_HOST | Public IP of EC2 |
| EC2_USER | ubuntu |
| EC2_SSH_KEY | Private SSH key of EC2 |

---

## Deployment Flow

1. Developer pushes code to GitHub
2. GitHub Actions pipeline triggers
3. Pipeline connects to EC2 via SSH
4. Pulls latest code
5. Rebuilds Docker image
6. Restarts container
7. New version becomes live

---

## Verification

After pushing code:

    GitHub → Actions → Workflow Running

Then open:

    http://<EC2_PUBLIC_IP>:81

Click the button to verify backend container status.

---

## Troubleshooting

Check container logs:

    docker logs nodeapp

Restart container:

    docker restart nodeapp

Check running containers:

    docker ps

---

## Key Features

- Automated CI/CD deployment
- Docker containerized application
- AWS EC2 hosting
- Health check endpoint
- Zero manual deployment steps
