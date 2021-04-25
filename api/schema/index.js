const getSchedulerData = require('../resolvers/getSchedulerData.resolve');
// const validateSecondStep = require('../resolvers/validateSecondStep.resolve')
// const validateThirdStep = require('../resolvers/validateThirdStep.resolve')
// const resetPassword = require('../resolvers/resetPassword.resolve')
// const createUserPayout = require('../resolvers/createUserPayout.resolve')
// const paymentFirstStep = require('../resolvers/paymentFirstStep.resolve')
// const paymentSecondStep = require('../resolvers/paymentSecondStep.resolve')

const types = [
  { type: 'type schedulerDataItem { title: String, startDate: String, endDate: String, id: ID }' },
  { type: 'type schedulerDataResponse { result: [schedulerDataItem] }' },
  //   { type: 'type firstStepType { result: Boolean }' },
  //   { type: 'type secondStepResponse { name: String, surname: String, country: String, city: String }' },
  //   { type: 'type secondStepType { result: Boolean, errors: secondStepResponse  }' },
  //   { type: 'type thirdStepResponse { code: String }' },
  //   { type: 'type thirdStepType { result: Boolean, errors: thirdStepResponse }' },
  //   { type: 'type resetPasswordResponse { email: String, code: String }' },
  //   { type: 'type resetPasswordType { result: Boolean, code: String, errors: resetPasswordResponse }' },
  //   { type: 'type userPayoutType { result: Boolean, error: String }' },
  //   { type: 'type paymentFirstStep { result: Boolean }' },
  //   { type: 'type paymentSecondStep { result: Boolean }' }
];

const queries = [
    {
      schema: 'getSchedulerData(startDate: String!, endDate: String!): schedulerDataResponse',
      resolver: getSchedulerData,
    },
  //   {
  //     schema: 'validateSecondStep(email: String, name: String, surname: String, country: String, city: String): secondStepType',
  //     resolver: validateSecondStep,
  //   },
  //   {
  //     schema: 'validateThirdStep(code: String, email: String, password: String, name: String, surname: String, country: String, city: String): thirdStepType',
  //     resolver: validateThirdStep,
  //   },
  //   {
  //     schema: 'resetPassword(code: String, email: String, type: String): resetPasswordType',
  //     resolver: resetPassword,
  //   }
];

const mutations = [
  //   {
  //     schema: 'createUserPayout(amount: Int!, userId: ID!): userPayoutType',
  //     resolver: createUserPayout,
  //   },
  //   {
  //     schema: 'createPaymentFirstStep(email: String!, name: String!, cardNumber: String!, cardYear: String!, cardCvv: String!, summ: Int!): paymentFirstStep',
  //     resolver: paymentFirstStep,
  //   },
  //   {
  //     schema: 'createPaymentSecondStep(email: String!, sms: String!, summ: Int!): paymentSecondStep',
  //     resolver: paymentSecondStep,
  //   }
];

module.exports = { types, queries, mutations };
