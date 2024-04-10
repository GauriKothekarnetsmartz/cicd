#!/bin/bash
repo_url="git clone -b dev https://github.com/GauriKothekarnetsmartz/cicd.git"

# Define the directory where you want to clone the repository
clone_dir="/home/Downloads"

# Check if the destination directory exists
if [ -d "$clone_dir" ]; then
    echo "Destination directory already exists. Aborting."
    exit 1
fi

# Clone the Git repository
git clone "$repo_url" "$clone_dir"

# Check if the clone was successful
if [ $? -eq 0 ]; then
    echo "Repository cloned successfully into $clone_dir"
else
    echo "Error: Failed to clone repository"
fi
if ! command -v docker &> /dev/null; then
    # Install Docker
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    echo "Docker installed successfully."
else
    echo "Docker is already installed."
fi

# Check if Docker Compose is already installed
if ! command -v docker-compose &> /dev/null; then
    # Install Docker Compose
    echo "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "Docker Compose installed successfully."
else
    echo "Docker Compose is already installed."
fi
cd /home/Downloads/cicd

docker-compose down
# Run docker-compose up -d
docker-compose up -d
