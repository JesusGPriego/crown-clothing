import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const cachedCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategories = createSelector(
  [cachedCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
