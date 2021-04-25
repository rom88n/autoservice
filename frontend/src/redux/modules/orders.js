import { GET_ORDERS } from 'apollo/queries';
import { showMessage } from 'redux/modules';

const SET_ORDERS = 'SET_ORDERS';

const initialState = {
  data: [],
  total: 0
};

export function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        data: action.data,
        total: action.total
      };

    default:
      return state;
  }
}

export const getOrders = (params = {}) => {
  return async (dispatch, getState, { client }) => {
    const { search, page = 1, limit = 25 } = params;
    try {
      const request = await client.mutate({
        mutation: GET_ORDERS,
        variables: {
          skip: (page - 1) * limit,
          search
        }
      });
      const result = await request;
      const { data: { allOrders, _allOrdersMeta } } = result;
      if (allOrders) {
        dispatch({
          type: SET_ORDERS,
          data: allOrders,
          total: _allOrdersMeta.count
        });
      }
    } catch (er) {
      console.error(er);
      dispatch(showMessage({ type: 'error', text: er.toString() }));
    }
  };
};
