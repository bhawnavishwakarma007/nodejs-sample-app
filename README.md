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
