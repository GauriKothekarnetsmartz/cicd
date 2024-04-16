#!/bin/bash

# Check OS type of machine
os_type=$(uname -s)

# Install Docker and Git based on OS type
if [[ $os_type == "Linux" ]]; then
    # Linux installation
    sudo apt-get update
    sudo apt-get install -y docker.io git
    sudo systemctl start docker
    sudo systemctl enable docker
    # Install Docker Compose
    sudo apt-get install -y docker-compose
elif [[ $os_type == "Darwin" ]]; then
    # macOS installation
    brew install docker git
    # Install Docker Compose
    brew install docker-compose
elif [[ $os_type == "Windows_NT" ]]; then
    # Windows installation (using Git Bash)
    echo "Windows installation not supported yet."
    exit 1
else
    echo "Unsupported OS."
    exit 1
fi

# Clone repository
git clone -b dev https://github.com/GauriKothekarnetsmartz/cicd.git
