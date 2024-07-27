import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../store/categorySlice';
import { transactionsReducer } from '../store/transactionSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
