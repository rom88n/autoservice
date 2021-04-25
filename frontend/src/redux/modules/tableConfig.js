import { get } from 'lodash';
import { showMessage } from 'redux/modules';

const initialState = {
  data: [],
  selected: [],
  total: 0,
  page: 1,
  limit: 15
};

export function tableConfigReducer(state = initialState, action) {
  switch (action.type) {
    case 'TABLE_SET_DATA':
      return {
        ...state,
        data: action.data,
        total: action.total
      };
    case 'TABLE_SET_SELECTED':
      return {
        ...state,
        selected: action.selected
      };
    case 'TABLE_SET_SEARCH':
      return {
        ...state,
        search: action.search
      };
    case 'TABLE_SET_PAGINATION':
      return {
        ...state,
        page: action.page,
        limit: action.limit
      };
    case 'TABLE_CLEAR_CONFIG':
      return initialState;

    default:
      return state;
  }
}

export const clearConfig = () => ({
  type: 'TABLE_CLEAR_CONFIG'
});

export const setSelected = (selected) => ({ type: 'TABLE_SET_SELECTED', selected });

export const setSearch = (search) => ({ type: 'TABLE_SET_SEARCH', search });

export const setPagination = (data) => ({ type: 'TABLE_SET_PAGINATION', ...data });

export const getData = async ({ variables, query, dataPath, totalPath }) => {
  return async (dispatch, getState, { client }) => {
    try {
      const request = await client.query({
        query,
        variables
      });
      const result = await request;
      const { data } = result;
      if (get(data, dataPath)) {
        await dispatch({
          type: 'TABLE_SET_DATA',
          data: get(data, dataPath, []),
          total: get(data, `${totalPath}.count`, 0)
        });
      }
    } catch (er) {
      console.error(er);
      await dispatch(showMessage({ type: 'error', text: er.toString() }));
    }
  };
};

export const removeRows = async ({ query, ids }) => {
  return async (dispatch, getState, { client }) => {
    try {
      const request = await client.mutate({
        mutation: query,
        variables: { ids }
      });
      const result = await request;
      const { data } = result;

      if (data.errors) {
        await dispatch(showMessage({ type: 'success', text: 'Успешно удалено' }));
      }
    } catch (er) {
      console.error(er);
      await dispatch(showMessage({ type: 'error', text: er.toString() }));
    }
  };
};
