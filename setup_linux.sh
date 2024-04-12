#!/bin/bash

# Check OS type
os_type=$(uname -s)

# Install Docker and Git based on OS type
if [[ $os_type == "Linux" ]]; then
    # Linux installation
    sudo apt-get update
    sudo apt-get install -y docker.io git
    sudo systemctl start docker
    sudo systemctl enable docker
elif [[ $os_type == "Darwin" ]]; then
    # macOS installation
    brew install docker git
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

