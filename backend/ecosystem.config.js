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
    script: './dist/app.js',
    env: {
      NODE_ENV: 'production'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/ituzov/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy': `echo "Starting pre-deploy" && ls -la /c/Users/ituzov/.ssh && scp -i /c/Users/ituzov/.ssh/id_rsa -o StrictHostKeyChecking=no .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current/.env`,
      'post-deploy': `echo "Starting post-deploy" && cd ${DEPLOY_PATH}/current && npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production`,
    },
  },
};
