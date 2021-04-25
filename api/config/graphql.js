const { GraphQLApp } = require('@keystonejs/app-graphql');

const graphQLApp = new GraphQLApp({
  apiPath: '/api',
  graphiqlPath: '/graphiql'
})

module.exports = graphQLApp
