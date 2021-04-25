const extendGraphQLSchema = require('../schema');
const { Keystone } = require('@keystonejs/keystone');
const { createItems } = require('@keystonejs/server-side-graphql-client');

const Adapter = require('./adapter')

const PROJECT_NAME = 'autoservice';

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: Adapter,
  cookieSecret: process.env.COOKIE_SECRET,
  onConnect: async () => {
    // Initialise some data.
    // NOTE: This is only for demo purposes and should not be used in production
    const users = await keystone.lists.User.adapter.findAll();
    if (!users.length) {
      const initialData = require('../initialData');
      await createItems({ keystone, listKey: 'User', items: initialData.User });
    }
  },
  secureCookies: false
});

keystone.createList('User', require('../models/User'));
keystone.createList('Order', require('../models/Order'));

keystone.extendGraphQLSchema(extendGraphQLSchema);


module.exports = keystone
