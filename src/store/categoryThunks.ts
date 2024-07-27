import { AppDispatch, RootState } from '../app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiCategories, ApiCategory, Category } from '../types';
import axiosApi from '../axiosApi';

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { dispatch: AppDispatch }
>('categories/fetchCategories', async () => {
  const categoriesResponse = await axiosApi.get<ApiCategories | null>(
    '/categories.json',
  );
  const categories = categoriesResponse.data;

  let newCategories: Category[] = [];

  if (categories) {
    newCategories = Object.keys(categories).map((key: string) => {
      const category = categories[key];
      return {
        id: key,
        ...category,
      };
    });
  }

  return newCategories;
});

export const createCategory = createAsyncThunk<
  void,
  ApiCategory,
  { state: RootState }
>('categories/create', async (apiCategory) => {
  await axiosApi.post('/categories.json', apiCategory);
});

export const deleteCategory = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('categories/deleteCategory', async (catId) => {
  await axiosApi.delete(`/categories/${catId}.json`);
});

export interface UpdateCategoryArg {
  id: string;
  apiCategory: ApiCategory;
}

export const updateCategory = createAsyncThunk<
  void,
  UpdateCategoryArg,
  { state: RootState }
>('categories/update', async ({ id, apiCategory }) => {
  await axiosApi.put(`/categories/${id}.json`, apiCategory);
});

export const fetchOneCategory = createAsyncThunk<
  ApiCategory,
  string,
  { state: RootState }
>('categories/fetchOne', async (id) => {
  const { data: category } = await axiosApi.get<ApiCategory | null>(
    `/categories/${id}.json`,
  );

  if (category === null) {
    throw new Error('Not found');
  }

  return category;
});
