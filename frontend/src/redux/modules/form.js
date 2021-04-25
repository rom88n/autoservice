import get from 'lodash/get';
import omit from 'lodash/omit';
import { showMessage } from 'redux/modules';

const initialState = {
  initialValues: {}
};

export function formReducer(state = initialState, action) {
  switch (action.type) {
    case 'FORM_SET_DATA':
      return {
        ...state,
        initialValues: action.values
      };
    case 'FORM_CLEAR_CONFIG':
      return initialState;

    default:
      return state;
  }
}

export const clearFormConfig = () => ({
  type: 'FORM_CLEAR_CONFIG'
});

export const getFormData = ({ query, dataPath, variables }) => {
  return async (dispatch, getState, { client }) => {
    try {
      const request = await client.query({ query, variables });
      const result = await request;
      const { data } = result;
      if (get(data, dataPath)) {
        await dispatch({
          type: 'FORM_SET_DATA',
          values: get(data, dataPath, {})
        });
      }
    } catch (er) {
      console.error(er);
      await dispatch(showMessage({ type: 'error', text: er.toString() }));
    }
  };
};

export const submitFormData = ({ query, dataPath, variables, values, onSuccess }, helpers) => {
  return async (dispatch, getState, { client, history }) => {
    try {
      helpers.setSubmitting(true);
      const res = await client.mutate({
        mutation: query,
        variables: { ...variables, data: omit(values, ['id', '__typename', 'createdAt', 'updatedAt']) }
      });

      if (get(res, `data.${dataPath}`)) {
        onSuccess && onSuccess({ dispatch, history, helpers });
      } else {
        dispatch(showMessage({ type: 'error', text: 'Ошибка' }));
      }
    } catch (er) {
      helpers.setSubmitting(false);
      const errorMsg = get(er, 'graphQLErrors[0].data.messages[0]') || get(er, 'graphQLErrors[0].message')
      await dispatch(showMessage({ type: 'error', text: errorMsg || 'Ошибка' }));
    }
  };
};
