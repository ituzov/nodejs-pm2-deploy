require('dotenv').config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './backend/dist/app.js',
    env: {
      NODE_ENV: 'production'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/ituzov/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-setup': `${DEPLOY_USER}@${DEPLOY_HOST} 'rm -rf ${DEPLOY_PATH}/current'`,
      'pre-deploy': `echo "Starting pre-deploy" && ls -la /c/Users/ituzov/.ssh`,
      'post-deploy': `echo "Starting post-deploy" && cd ${DEPLOY_PATH}/current/backend && npm install && npm run build && pm2 startOrRestart ${DEPLOY_PATH}/current/backend/ecosystem.config.js --env production && pm2 save`,
      'post-setup': `echo "Setup completed"`,
    },
  },
};
