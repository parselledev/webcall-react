import * as types from './user.types';

const userAuthRequest = () => ({
  type: types.USER_AUTH_REQUEST
});

const userGetRequest = () => ({
  type: types.USER_GET_REQUEST
});

const userAuthSuccess = (id) => ({
  type: types.USER_AUTH_SUCCESS,
  payload: id
});

const userAuthFailure = err => ({
  type: types.USER_AUTH_FAILURE,
  payload: err
});

const userGetSuccess = data => ({
  type: types.USER_GET_SUCCESS,
  payload: data
});

const userGetFailure = err => ({
  type: types.USER_GET_FAILURE,
  payload: err
});

export const userGet = (dispatch, apiService, id) => () => {
  dispatch(userGetRequest());
  apiService.getUser(id)
    .then(data => dispatch(userGetSuccess(data)))
    .catch(err => dispatch(userGetFailure(err)));
}

export const userAuth = (dispatch, apiService, login, password) => () => {
  dispatch(userAuthRequest());
  apiService.auth(login, password)
    .then(res => {
        dispatch(userAuthSuccess(res));
        dispatch(userGet(dispatch, apiService, res))
    })
    .catch(err => dispatch(userAuthFailure(err)))
}

export const userLogout = (dispatch) => () => {
  dispatch({
    type: types.USER_LOGOUT
  })
}