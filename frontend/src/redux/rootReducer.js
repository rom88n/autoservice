import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { applicationReducer, ordersReducer, tableConfigReducer, formReducer, schedulerReducer } from './modules';

export default combineReducers({
  application: applicationReducer,
  routing: routerReducer,
  orders: ordersReducer,
  tableConfig: tableConfigReducer,
  form: formReducer,
  scheduler: schedulerReducer,
})
