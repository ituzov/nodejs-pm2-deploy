require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
} = process.env;

console.log(`DEPLOY_USER: ${DEPLOY_USER}`);
console.log(`DEPLOY_HOST: ${DEPLOY_HOST}`);
console.log(`DEPLOY_PATH: ${DEPLOY_PATH}`);
console.log(`DEPLOY_REF: ${DEPLOY_REF}`);

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/Username/repository.git',
      path: DEPLOY_PATH,
      'pre-setup': `echo "Deploying with user: ${DEPLOY_USER}" && echo "Deploying to host: ${DEPLOY_HOST}" && echo "Deploying to path: ${DEPLOY_PATH}" && echo "Using SSH key: /c/Users/ituzov/.ssh/id_rsa"`,
      'pre-deploy': `scp -i /c/Users/ituzov/.ssh/id_rsa -o StrictHostKeyChecking=no .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-setup': 'echo "Setup completed"',
      'post-deploy': 'npm i && npm run build',
    },
  },
};
