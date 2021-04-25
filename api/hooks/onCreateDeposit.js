// const adapter = require('../config/adapter');
//
// module.exports = async function({ resolvedData }) {
//   const { listAdapters: { User } } = adapter
//
//   const user = await User.findOne({ id: resolvedData.user });
//
//   if (resolvedData.amount > user.cash) throw new Error('Нехватает средств на счету');
//   await User.update(user.id, { cash: user.cash - resolvedData.amount });
//
//   return resolvedData;
// };
