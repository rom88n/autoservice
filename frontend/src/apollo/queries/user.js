import gql from 'graphql-tag'

export const AUTH = gql`
mutation auth($login: String!, $password: String!) {
   authenticateUserWithPassword(login: $login, password: $password) {
    token
    item {
      id
      accessLevel
      name
    }
  }
}
`

export const UNAUTH = gql`
 mutation {
  unauthenticate: unauthenticateUser {
    success
  }
}
`

export const VALID_USER = gql`
query {
   authenticatedUser {
    id
  }
}
`

export const GET_USERS = gql`
  query($search: String, $skip: Int) {
    allUsers(
      skip: $skip, first: 15,
      where: { OR: [
        { name_contains_i: $search },
        { login_contains_i: $search }
      ]}) {
      id
      name
      login
      accessLevel
    }
    _allUsersMeta(
      where: { OR: [
        { name_contains_i: $search },
        { login_contains_i: $search }
      ]}
    ) {
      count
    }
  }
`

export const DELETE_USERS = gql`
 mutation ($ids: [ID!]) {
  deleteUsers(ids: $ids) {
    id
  }
}
`

export const USER_BY_ID = gql`
   query($id: ID!) {
     User(where:{ id: $id }) {
       id
       login
       name
       accessLevel
     }
  }
`

export const USER_UPDATE = gql`
 mutation($id: ID!, $data: UserUpdateInput) {
  updateUser(id: $id, data: $data) {
     id
     login
     name
     accessLevel
  }
}
`

export const USER_CREATE = gql`
 mutation($data: UserCreateInput) {
  createUser(data: $data) {
     id
     login
     name
     accessLevel
  }
}
`
