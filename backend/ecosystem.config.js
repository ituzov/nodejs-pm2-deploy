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
    script: './current/backend/dist/app.js'
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/ituzov/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy': `echo "Starting pre-deploy"`,
      'post-deploy': `echo "Starting post-deploy" && cd ${DEPLOY_PATH}/current/backend && npm install && npm run build && pm2 startOrRestart ${DEPLOY_PATH}/current/backend/ecosystem.config.js && pm2 save`,
    },
  },
};
