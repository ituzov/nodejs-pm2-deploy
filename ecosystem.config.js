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
      repo: 'https://github.com/ituzov/nodejs-pm2-deploy',
      path: DEPLOY_PATH,
      'pre-deploy': `scp .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd backend && npm i && npm run build',
    },
  },
};
