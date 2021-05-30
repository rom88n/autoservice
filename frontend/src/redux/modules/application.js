import { AUTH, VALID_USER, UNAUTH } from 'apollo/queries';

const SET_USER = 'SET_USER';
const SET_MESSAGE = 'SET_MESSAGE';

const initialState = {
  user: null,
  message: null
};

export function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };

    default:
      return state;
  }
}

export function showMessage(payload) {
  return async (dispatch) => {
    dispatch({
      type: SET_MESSAGE,
      payload
    });
  };
}

export function loggingIn(data, { setSubmitting }) {
  return async (dispatch, getState, { client, history }) => {
    await client.mutate({
      mutation: AUTH,
      variables: data
    })
      .then(({ data: { authenticateUserWithPassword } }) => {
        dispatch({
          type: SET_USER,
          payload: { ...authenticateUserWithPassword.item, token: authenticateUserWithPassword.token }
        });
        localStorage.setItem('authToken', authenticateUserWithPassword.token)
        history.replace({ pathname: '/dashboard' })
      })
      .catch((er) => {
        dispatch(showMessage({ text: er.message, type: 'error' }));
      });
    return setSubmitting(false);
  };
}

export const logoutUser = () => {
  return async (dispatch, getState, { client, history }) => {
    try {
      const request = await client.query({ query: UNAUTH })
      const result = await request
      const { data: { unauthenticate } } = result

      if (unauthenticate.success) {
        localStorage.removeItem('authToken')
        history.replace({ pathname: '/login' })
        dispatch({
          type: SET_USER,
          payload: {}
        });
      }
    } catch (er) {
      console.error(er)
      dispatch(showMessage({ type: 'error', text: er.toString() }))
    }
  }
}

export const validateUser = () => {
  return async (dispatch, getState, { client, history }) => {
    try {
      const request = await client.query({
        query: VALID_USER
      });
      const result = await request;
      const { data: { authenticatedUser } } = result;

      if (!authenticatedUser) {
        localStorage.removeItem('authToken')
        history.replace({ pathname: '/login' })
        await dispatch({
          type: SET_USER,
          payload: null
        });
      }
    } catch (er) {
      console.error(er);
    }
  };
};
