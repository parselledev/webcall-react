import * as types from './contacts.types';

const contactsFetchRequest = () => ({
  type: types.CONTACTS_FETCH_REQUEST
});

const contactsFetchSuccess = contacts => ({
  type: types.CONTACTS_FETCH_SUCCESS,
  payload: contacts
});

const contactsFetchFailure = err => ({
  type: types.CONTACTS_FETCH_FAILURE,
  payload: err
});

const contactsAddRequest = () => ({
  type: types.CONTACTS_ADD_REQUEST
});

const contactsAddSuccess = newContact => ({
  type: types.CONTACTS_ADD_SUCCESS,
  payload: newContact
});

const contactsAddFailure = err => ({
  type: types.CONTACTS_ADD_FAILURE,
  payload: err
});

const contactsEditRequest = () => ({
  type: types.CONTACTS_EDIT_REQUEST
});

const contactsEditSuccess = (id, updatedContact) => ({
  type: types.CONTACTS_EDIT_SUCCESS,
  id,
  payload: updatedContact
});

const contactsEditFailure = err => ({
  type: types.CONTACTS_EDIT_FAILURE,
  payload: err
});

const contactsDeleteRequest = () => ({
  type: types.CONTACTS_DELETE_REQUEST
});

const contactsDeleteSuccess = id => ({
  type: types.CONTACTS_DELETE_SUCCESS,
  payload: id
});

const contactsDeleteFailure = err => ({
  type: types.CONTACTS_DELETE_FAILURE,
  payload: err
});


export const contactsGet = (dispatch, apiService, userId) => () => {
  dispatch(contactsFetchRequest());
  apiService.getContacts(userId)
    .then(contacts => dispatch(contactsFetchSuccess(contacts)))
    .catch(err => dispatch(contactsFetchFailure(err)))
}

export const contactsSearch = query => ({
  type: types.CONTACTS_SEARCH,
  payload: query
});

export const contactsAdd = (dispatch, apiService, contacts, userId, name, phone, avatar) => () => {
  const id = contacts.reduce((maxId, contacts) => Math.max(contacts.id, maxId), -1) +1;
  const serverContact = {
    name,
    avatar,
    phone: phone.toString()
  };
  const appContact = {
    ...serverContact,
    id: id.toString(),
    userId: userId.toString()
  }

  dispatch(contactsAddRequest());
  
  apiService.addContact(userId, serverContact)
    .then(() => {
      dispatch(contactsAddSuccess(appContact));
    })
    .catch(err => contactsAddFailure(err))
}

export const contactsEdit = (dispatch, apiService, userId, id, name, phone, avatar) => () => {

  const changedContact = {
    name,
    avatar,
    phone: phone.toString()
  }

  dispatch(contactsEditRequest());

  apiService.editContact(userId, id, changedContact)
    .then(() => {
      dispatch(contactsEditSuccess(id, changedContact));
    })
    .catch(err => contactsEditFailure(err))
}

export const contactsDelete = (dispatch, apiService, userId, id) => () => {
  dispatch(contactsDeleteRequest());
  apiService.deleteContact(userId, id)
    .then(() => {
      dispatch(contactsDeleteSuccess(id))
    })
    .catch(err => contactsDeleteFailure(err))
}