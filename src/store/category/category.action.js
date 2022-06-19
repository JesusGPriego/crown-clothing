import { CATEGORY_ACTION_TYPES } from './category.types';

export const setCategories = (categoriesArray) => ({
  type: CATEGORY_ACTION_TYPES.SET_CATEGORIES,
  payload: { categories: categoriesArray },
});
