const { execSync } = require('child_process');
const os = require('os');
const path = require('path');

// Clone the repository
console.log('Cloning repository...');
execSync('git clone https://github.com/GauriKothekarnetsmartz/cicd.git');

// Navigate into the cloned repository directory
process.chdir('cicd');

// Install Node.js dependencies for the UI
console.log('Installing Node.js dependencies for the UI...');
execSync('cd notes-ui && npm install');

// Navigate back to the root directory
process.chdir('..');

// Install server-side dependencies
console.log('Installing server-side dependencies...');
execSync('npm install');

// Setup MySQL database
console.log('Creating MySQL database and importing schema...');
try {
    execSync('sudo mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS notes;"');
    execSync('sudo mysql -u root -p notes < database/notes.sql');
    console.log('MySQL database setup completed.');
} catch (error) {
    console.error('Error setting up MySQL database:', error);
}

// Open project in Visual Studio Code
console.log('Opening project in Visual Studio Code...');
const editor = os.platform() === 'win32' ? 'code .' : 'code .'; // 'code .' works for both macOS and Linux
execSync(editor, { cwd: path.resolve('cicd') });

console.log('Setup completed successfully.');
