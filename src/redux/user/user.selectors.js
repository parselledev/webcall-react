import {createSelector} from 'reselect';

const userSelector = state => state.user;

export const selectUserData = createSelector(
  [userSelector],
  user => user.data
);

export const selectUserId = createSelector(
  [userSelector],
  user => user.id
);

export const selectUserFetching = createSelector(
  [userSelector],
  user => user.fetching
);

export const selectUserErr = createSelector(
  [userSelector],
  user => user.err
);