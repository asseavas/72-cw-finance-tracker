import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiCategories, ApiTransaction, MergedTransaction } from '../types';
import { RootState } from '../app/store';
import axiosApi from '../axiosApi';

export const fetchTransactions = createAsyncThunk<
  MergedTransaction[],
  void,
  { state: RootState }
>('transactions/fetch', async () => {
  const { data: categoriesData } = await axiosApi.get<ApiCategories | null>(
    '/categories.json',
  );
  const { data: transactionsData } = await axiosApi.get<{
    [id: string]: ApiTransaction;
  } | null>('/transactions.json');

  if (!categoriesData || !transactionsData) {
    return [];
  }

  const categories = Object.keys(categoriesData).map((id) => ({
    id,
    ...categoriesData[id],
  }));

  const transactions = Object.keys(transactionsData).map((id) => ({
    id,
    ...transactionsData[id],
  }));

  const mergedTransactions: MergedTransaction[] = transactions.map(
    (transaction) => {
      const category = categories.find(
        (cat) => cat.id === transaction.category,
      );
      return {
        ...transaction,
        categoryName: category ? category.name : 'Unknown',
      };
    },
  );

  return mergedTransactions;
});

export const createTransaction = createAsyncThunk<
  void,
  ApiTransaction,
  { state: RootState }
>('transactions/create', async (apiTransaction) => {
  await axiosApi.post('/transactions.json', apiTransaction);
});

export const deleteTransaction = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('transactions/deleteTransaction', async (id) => {
  await axiosApi.delete(`/transactions/${id}.json`);
});

export interface UpdateTransactionArg {
  id: string;
  apiTransaction: ApiTransaction;
}

export const updateTransaction = createAsyncThunk<
  void,
  UpdateTransactionArg,
  { state: RootState }
>('transactions/update', async ({ id, apiTransaction }) => {
  await axiosApi.put(`/transactions/${id}.json`, apiTransaction);
});

export const fetchOneTransaction = createAsyncThunk<
  ApiTransaction,
  string,
  { state: RootState }
>('transactions/fetchOne', async (id) => {
  const { data: transaction } = await axiosApi.get<ApiTransaction | null>(
    `/transactions/${id}.json`,
  );

  if (transaction === null) {
    throw new Error('Not found');
  }

  return transaction;
});
