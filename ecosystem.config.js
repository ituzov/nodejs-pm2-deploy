require('dotenv').config({ path: './.env.deploy' });
const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH_BACKEND,
  DEPLOY_PATH_FRONTEND,
  DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [
    {
      name: 'api-service',
      script: './backend/dist/app.js',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      env_testing: {
        NODE_ENV: 'testing',
      },
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/ituzov/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH_BACKEND,
      'pre-setup': `echo "Deploying with user: ${DEPLOY_USER}" && echo "Deploying to host: ${DEPLOY_HOST}" && echo "Deploying to path: ${DEPLOY_PATH_BACKEND}" && echo "Using SSH key: /c/Users/ituzov/.ssh/id_rsa"`,
      'pre-deploy': `scp -i /c/Users/ituzov/.ssh/id_rsa -o StrictHostKeyChecking=no .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH_BACKEND}`,
      'post-setup': 'echo "Setup completed"',
      'post-deploy': 'cd backend && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    },
    frontend: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/ituzov/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH_FRONTEND,
      'pre-setup': `echo "Deploying with user: ${DEPLOY_USER}" && echo "Deploying to host: ${DEPLOY_HOST}" && echo "Deploying to path: ${DEPLOY_PATH_FRONTEND}" && echo "Using SSH key: /c/Users/ituzov/.ssh/id_rsa"`,
      'pre-deploy': `scp -i /c/Users/ituzov/.ssh/id_rsa -o StrictHostKeyChecking=no .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH_FRONTEND}`,
      'post-setup': 'echo "Setup completed"',
      'post-deploy': `cd frontend && npm install && npm run build && cp -r build/* ${DEPLOY_PATH_FRONTEND}`,
    },
  },
};
