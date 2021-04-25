const { accessOptions, accessLevels } = require('../helpers/accessLevels')
const { Select, Password, Checkbox, Relationship, Text } = require('@keystonejs/fields');

// const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin)
// const userOwnsItem = ({ authentication: { item: user } }) => {
//   if (!user) {
//     return false
//   }
//   return { id: user.id }
// }
// const userIsAdminOrOwner = auth => {
//   const isAdmin = access.userIsAdmin(auth)
//   const isOwner = access.userOwnsItem(auth)
//   return isAdmin ? isAdmin : isOwner
// }
//

const hasPermission = ({ authentication: { item: user } }) => Boolean(user &&
  accessLevels.includes(user.accessLevel)
)

const User = {
  fields: {
    name: { type: Text, isRequired: true, label: 'Имя' },
    login: { type: Text, isUnique: true, isRequired: true, label: 'Login' },
    accessLevel: { type: Select, options: accessOptions, label: 'Права доступа' },
    password: { type: Password, isRequired: true, label: 'Пароль' }
  },
  access: {
    read: hasPermission,
    update: hasPermission,
    create: hasPermission,
    delete: hasPermission,
    auth: true
  },
  label: 'User',
  labelResolver: item => item.name
}

module.exports = User
