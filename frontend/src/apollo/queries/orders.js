import gql from 'graphql-tag'

export const GET_ORDERS = gql`
  query($search: String, $skip: Int) {
    allOrders(
      skip: $skip, first: 15,
      where: { OR: [
        { make_contains_i: $search },
        { model_contains_i: $search },
        { customerName_contains_i: $search },
        { customerPhone_contains_i: $search },
        { comments_contains_i: $search }
      ]}) {
        id
        cost
        make
        model
        year
        comments
        customerName
        customerPhone
        governmentNumber
        bodyNumber
        engineSize
        transmission
        mileage
        createdAt
        user {
          name
        }
      }
    _allOrdersMeta(
      where: { OR: [
        { make_contains_i: $search },
        { model_contains_i: $search },
        { customerName_contains_i: $search },
        { customerPhone_contains_i: $search },
        { comments_contains_i: $search }
      ]}
    ) {
      count
    }
  }
`

export const DELETE_ORDERS = gql`
 mutation ($ids: [ID!]) {
  deleteOrders(ids: $ids) {
    id
  }
}
`

export const ORDER_BY_ID = gql`
   query($id: ID!) {
     Order(where:{ id: $id }) {
       id
       cost
       make
       model
       year
       comments
       customerName
       customerPhone
       governmentNumber
       bodyNumber
       engineSize
       transmission
       mileage
       createdAt
       user {
         id
       }
     }
  }
`

export const ORDER_UPDATE = gql`
 mutation($id: ID!, $data: OrderUpdateInput) {
  updateOrder(id: $id, data: $data) {
     id
     cost
     make
     model
     year
     comments
     customerName
     customerPhone
     governmentNumber
     bodyNumber
     engineSize
     transmission
     mileage
     createdAt
  }
}
`

export const ORDER_CREATE = gql`
 mutation($data: OrderCreateInput) {
  createOrder(data: $data) {
   id
   cost
   make
   model
   year
   comments
   customerName
   customerPhone
   governmentNumber
   bodyNumber
   engineSize
   transmission
   mileage
   createdAt
  }
}
`
