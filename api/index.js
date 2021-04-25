require('dotenv').load({ path: './.env' });
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');

const keystone = require('./config/keystone')
const graphQLApp = require('./config/graphql')

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'login',
    secretField: 'password',
  }
});

module.exports = {
  keystone,
  apps: [
    graphQLApp,
    new AdminUIApp({
      adminPath: '/admin',
      apiPath: '/api',
      graphiqlPath: '/admin/graphiql',
      authStrategy,
      isAccessAllowed: ({ authentication: { item: user} }) => !!user && ['superAdmin', 'admin'].includes(user.accessLevel)
    })
  ],
  configureExpress: app => {
    app.set('trust proxy', true);
    return app
  },
};
