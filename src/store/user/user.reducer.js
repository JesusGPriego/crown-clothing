import { USER_ACTION_TYPES } from './user.types';

const handleFunction = (state, payload) => ({
  ...state,
  ...payload,
});

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  const isActionCorrect = Object.values(USER_ACTION_TYPES).includes(type);
  if (!isActionCorrect) return state;
  return handleFunction(state, payload);
};

const INITIAL_STATE = {
  currentUser: null,
};
