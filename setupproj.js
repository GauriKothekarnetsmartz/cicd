const { exec } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Define the URL of the Git repository to clone
const repoUrl = 'https://github.com/GauriKothekarnetsmartz/cicd.git';

// Define the directory where you want to clone the repository
const cloneDir = path.join(os.homedir(), 'Downloads', 'cicd');

// Check if the destination directory exists
if (fs.existsSync(cloneDir)) {
    console.log("Destination directory already exists. Aborting.");
    process.exit(1);
}

// Clone the Git repository
exec(`git clone -b dev ${repoUrl} ${cloneDir}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: Failed to clone repository: ${error.message}`);
        process.exit(1);
    }
    console.log(`Repository cloned successfully into ${cloneDir}`);
});

// Install Docker
exec('docker -v', (error, stdout, stderr) => {
    if (error) {
        console.log("Installing Docker...");
        const dockerScriptUrl = 'https://get.docker.com';
        fetch(dockerScriptUrl)
            .then(res => res.text())
            .then(script => {
                fs.writeFileSync('get-docker.sh', script);
                exec('sh get-docker.sh', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error: ${error.message}`);
                        process.exit(1);
                    }
                    console.log("Docker installed successfully.");
                    fs.unlinkSync('get-docker.sh');
                });
            })
            .catch(err => {
                console.error(`Error: ${err.message}`);
                process.exit(1);
            });
    } else {
        console.log("Docker is already installed.");
    }
});

// Install Docker Compose
exec('docker-compose -v', (error, stdout, stderr) => {
    if (error) {
        console.log("Installing Docker Compose...");
        const composeUrl = 'https://github.com/docker/compose/releases/download/1.29.2/docker-compose-Linux-x86_64';
        fetch(composeUrl)
            .then(res => res.buffer())
            .then(buffer => {
                fs.writeFileSync('/usr/local/bin/docker-compose', buffer);
                fs.chmodSync('/usr/local/bin/docker-compose', '755');
                console.log("Docker Compose installed successfully.");
            })
            .catch(err => {
                console.error(`Error: ${err.message}`);
                process.exit(1);
            });
    } else {
        console.log("Docker Compose is already installed.");
    }
});

// Change directory to the cloned repository
process.chdir(cloneDir);

// Bring down the existing containers and networks
exec('docker-compose down', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
    // Run docker-compose up -d to start the containers again
    exec('docker-compose up -d', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
        console.log("Docker containers started successfully.");
    });
});
