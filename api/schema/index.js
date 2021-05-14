const getSchedulerData = require('../resolvers/getSchedulerData.resolve');

const types = [
  { type: 'type schedulerDataItem { title: String, startDate: String, endDate: String, id: ID }' },
  { type: 'type schedulerDataResponse { result: [schedulerDataItem] }' },
];

const queries = [
    {
      schema: 'getSchedulerData(startDate: String!, endDate: String!): schedulerDataResponse',
      resolver: getSchedulerData,
    },
];

const mutations = [];

module.exports = { types, queries, mutations };
