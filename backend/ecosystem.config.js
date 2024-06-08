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
    script: '.dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:Anchas/nodejs-mesto-project.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': `export PATH=$PATH:~/.nvm/versions/node/v14.21.3/bin/ && cd ${DEPLOY_PATH}/current/backend && npm install && npm run build && pm2 startOrRestart ecosystem.config.js && pm2 save`,
    },
  },
};
