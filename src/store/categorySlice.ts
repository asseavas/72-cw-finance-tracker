import { ApiCategory, Category } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  fetchOneCategory,
  updateCategory,
} from './categoryThunks';

export interface CategoriesState {
  items: Category[];
  fetchLoading: boolean;
  deleteLoading: false | string;
  createLoading: boolean;
  updateLoading: boolean;
  fetchOneLoading: boolean;
  oneCategory: null | ApiCategory;
}

const initialState: CategoriesState = {
  items: [],
  fetchLoading: false,
  deleteLoading: false,
  createLoading: false,
  updateLoading: false,
  fetchOneLoading: false,
  oneCategory: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload: categories }) => {
        state.fetchLoading = false;
        state.items = categories;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(createCategory.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(deleteCategory.pending, (state, { meta: { arg: catId } }) => {
        state.deleteLoading = catId;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.updateLoading = false;
      });

    builder
      .addCase(fetchOneCategory.pending, (state) => {
        state.oneCategory = null;
        state.fetchOneLoading = true;
      })
      .addCase(
        fetchOneCategory.fulfilled,
        (state, { payload: apiCategory }) => {
          state.oneCategory = apiCategory;
          state.fetchOneLoading = false;
        },
      )
      .addCase(fetchOneCategory.rejected, (state) => {
        state.fetchOneLoading = false;
      });
  },
  selectors: {
    selectCategories: (state) => state.items,
    selectFetchCategoriesLoading: (state) => state.fetchLoading,
    selectCreateCategoryLoading: (state) => state.createLoading,
    selectDeleteCategoryLoading: (state) => state.deleteLoading,
    selectOneCategoryLoading: (state) => state.fetchOneLoading,
    selectUpdateCategoryLoading: (state) => state.updateLoading,
    selectOneCategory: (state) => state.oneCategory,
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const {
  selectCategories,
  selectFetchCategoriesLoading,
  selectCreateCategoryLoading,
  selectDeleteCategoryLoading,
  selectOneCategoryLoading,
  selectUpdateCategoryLoading,
  selectOneCategory,
} = categoriesSlice.selectors;
