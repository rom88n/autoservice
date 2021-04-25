const { gql } = require('apollo-server-express');
const { accessLevels } = require('../../accessLevels')

const query = gql`
  query($itemId: ID!) {
     Order(where:{ id: $itemId }) {
       user {
       id
      }
    }
  }
`

const update = async ({ authentication: { item: user }, itemId, context }) => {
  const res = await context.executeGraphQL({
    query,
    variables: { itemId },
  })
  const userCreatorsIds = res.data.Order.user.map(i => i.id)

  return Boolean(user &&
    (userCreatorsIds.includes(user.id) || accessLevels.slice(0, 2).includes(user.accessLevel))
  )
}

module.exports = update;
