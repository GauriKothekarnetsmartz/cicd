#!/bin/bash

# Function to install extension on Windows
install_windows() {
    echo "Installing Dev Container extension on Windows"
    code --install-extension ms-vscode-remote.remote-containers
}

# Function to install extension on macOS
install_macos() {
    echo "Installing Dev Container extension on macOS"
    code --install-extension ms-vscode-remote.remote-containers
}

# Function to install extension on Linux
install_linux() {
    echo "Installing Dev Container extension on Linux"
    code --install-extension ms-vscode-remote.remote-containers
}

# Detect the operating system
case "$(uname -s)" in
    Linux*)     install_linux ;;
    Darwin*)    install_macos ;;
    CYGWIN*)    install_windows ;;
    MINGW*)     install_windows ;;
    *)          echo "Unsupported operating system" ;;
esac
