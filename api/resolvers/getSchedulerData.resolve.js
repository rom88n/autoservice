const adapter = require('../config/adapter');
const moment = require('moment');

module.exports = async function(obj, args, context, info, extra) {
  const { startDate, endDate } = args
  const { listAdapters: { Order } } = adapter
  console.log('args', {
    startDate: startDate,
    endDate: endDate,
  })
  const orders = await Order.model
    .find({
      createdAt_utc: {
      $gte: startDate,
      $lte: endDate,
    }
  });

  const result = orders
    .filter(i => i.createdAt_utc)
    .map(item => (
    {
      id: item.id,
      title: `${item.make || ''} ${item.model || ''}`,
      startDate: moment(item.createdAt_utc).startOf('day').format('YYYY-MM-DD hh:mm A'),
      endDate: moment(item.createdAt_utc).add(1, 'days').startOf('day').format('YYYY-MM-DD hh:mm A'),
    }
  ))
  console.log('result', result)
  return { result }
}
