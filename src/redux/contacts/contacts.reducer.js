import {
  CONTACTS_FETCH_REQUEST,
  CONTACTS_FETCH_SUCCESS,
  CONTACTS_FETCH_FAILURE,
  CONTACTS_SEARCH,
  CONTACTS_ADD_REQUEST,
  CONTACTS_ADD_SUCCESS,
  CONTACTS_ADD_FAILURE,
  CONTACTS_EDIT_REQUEST,
  CONTACTS_EDIT_SUCCESS,
  CONTACTS_EDIT_FAILURE,
  CONTACTS_DELETE_REQUEST,
  CONTACTS_DELETE_SUCCESS,
  CONTACTS_DELETE_FAILURE
} from './contacts.types';

import {contactsDelete} from './contacts.utils';

const INITIAL_STATE = {
  data: [],
  fetching: false,
  search: '',
  err: null
};

const contactsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case CONTACTS_FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        err: null
      };

    case CONTACTS_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetching: false,
        err: null
      };

    case CONTACTS_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        err: action.payload
      };
    
    case CONTACTS_SEARCH:
      return {
        ...state,
        search: action.payload
      }

    case CONTACTS_ADD_REQUEST:
      return {
        ...state,
        fetching: true,
        err: null
      };

    case CONTACTS_ADD_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          {
            ...action.payload
          }
        ],
        fetching: false,
        err: null
      };
    
    case CONTACTS_ADD_FAILURE:
      return {
        ...state,
        fetching: false,
        err: action.payload
      };

      case CONTACTS_EDIT_REQUEST:
        return {
          ...state,
          fetching: true,
          err: null
        };
  
      case CONTACTS_EDIT_SUCCESS:
        return {
          ...state,
          data: state.data.map(contact =>
            contact.id === action.id ?
              {
                ...contact,
                ...action.payload
              }
              :
              contact
            ),
          fetching: false,
          err: null
        };
      
      case CONTACTS_EDIT_FAILURE:
        return {
          ...state,
          fetching: false,
          err: action.payload
        };

      case CONTACTS_DELETE_REQUEST:
        return {
          ...state,
          fetching: true,
          err: null
        };
  
      case CONTACTS_DELETE_SUCCESS:
        return {
          ...state,
          data: contactsDelete(state.data, action.payload),
          fetching: false,
          err: null
        };
      
      case CONTACTS_DELETE_FAILURE:
        return {
          ...state,
          fetching: false,
          err: action.payload
        };

    default:
      return state;
  }
}

export default contactsReducer;