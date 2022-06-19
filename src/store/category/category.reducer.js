import { CATEGORY_ACTION_TYPES } from './category.types';

const handleFunction = (state, payload) => ({
  ...state,
  ...payload,
});

export const categoryReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  const isActionCorrect = Object.values(CATEGORY_ACTION_TYPES).includes(type);
  if (!isActionCorrect) return state;
  return handleFunction(state, payload);
};

const INITIAL_STATE = {
  categories: [],
};
