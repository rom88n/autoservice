const { accessLevels } = require('../helpers/accessLevels')
const { Integer, Select, Relationship, Text } = require('@keystonejs/fields')
const { atTracking } = require('@keystonejs/list-plugins')
const updateAccess = require('../helpers/permissions/order/update')

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
// const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner }

const transmissionOptions = [
  { value: 'automatic', label: 'Автоматическая' },
  { value: 'manual', label: 'Ручная' }
]

const Order = {
  fields: {
    user: { type: Relationship, ref: 'User', label: 'Сотрудник', many: true, isRequired: true },
    make: { type: Text, label: 'Марка', isRequired: true },
    model: { type: Text, label: 'Модель' },
    engineSize: { type: Integer, label: 'Объем двигателя' },
    transmission: { type: Select, options: transmissionOptions, label: 'Коробка передач' },
    mileage: { type: Integer, label: 'Пробег' },
    year: { type: Integer, label: 'Год' },
    governmentNumber: { type: Text, label: 'Государственный номер' },
    bodyNumber: { type: Text, label: 'Номер кузова' },
    engineNumber: { type: Text, label: 'Номер двигателя' },
    customerName: { type: Text, label: 'Имя клиента' },
    customerPhone: { type: Text, label: 'Номер телефона клиента' },
    comments: { type: Text, label: 'Комментарий', isRequired: true },
    cost: { type: Integer, label: 'Цена', isRequired: true },
  },
  access: {
    // allow for logged users
    read: ({ authentication: { item: user } }) => Boolean(user &&
      accessLevels.includes(user.accessLevel)
    ),
    // allow for superAdmins, admins and owners
    update: updateAccess,
    // allow for logged users
    create: ({ authentication: { item: user } }) => Boolean(user &&
      accessLevels.includes(user.accessLevel)
    ),
    // allow for logged users
    delete: ({ authentication: { item: user } }) => Boolean(user &&
      accessLevels.slice(0, 2).includes(user.accessLevel)
    ),
    auth: true
  },
  plugins: [
    atTracking({
      createdAtField: 'createdAt',
      updatedAtField: 'updatedAt',
      format: 'MM/DD/YYYY h:mm A',
      access: {
        read: true,
        create: true,
        update: true
      }
    }),
  ],
  label: 'Order',
  labelResolver: item => item.make
}

module.exports = Order
