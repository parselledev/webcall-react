import {
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  USER_LOGOUT,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAILURE
} from './user.types';

const INITIAL_STATE = {
  data: {},
  id: null,
  fetching: false,
  err: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case USER_AUTH_REQUEST:
    case USER_GET_REQUEST:
      return {
        ...state,
        fetching: true,
        err: null
      }
    
    case USER_AUTH_SUCCESS:
      return {
        ...state,
        id: action.payload,
        fetching: false,
        err: null
      }

    case USER_LOGOUT:
      return INITIAL_STATE

    case USER_GET_SUCCESS:
      return {
        ...state,
        data: {...action.payload}
      }


    case USER_AUTH_FAILURE:
    case USER_GET_FAILURE:
      return {
        ...state,
        data: {},
        fetching: false,
        err: action.payload
      }

    default:
      return state;
  }
}

export default userReducer;