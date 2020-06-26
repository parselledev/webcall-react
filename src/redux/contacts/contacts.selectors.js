import {createSelector} from 'reselect';

const selectContacts = state => state.contacts;

export const selectContactsData = createSelector(
  [selectContacts],
  contacts => contacts.data
);

export const selectContactsSearch = createSelector(
  [selectContacts],
  contacts => contacts.search
);

export const selectContactsFetching = createSelector(
  [selectContacts],
  contacts => contacts.fetching
);