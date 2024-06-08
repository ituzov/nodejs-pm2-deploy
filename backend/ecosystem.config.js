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
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/ituzov/nodejs-pm2-deploy',
      path: DEPLOY_PATH,
      'pre-deploy': `echo "Starting pre-deploy" && ls -la /c/Users/ituzov/.ssh && scp -i /c/Users/ituzov/.ssh/id_rsa -o StrictHostKeyChecking=no .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/.env`,
      'post-deploy': `echo "Starting post-deploy" && cd ${DEPLOY_PATH}/current && npm install && npm run build`,
    },
  },
};
