import { ApiTransaction, MergedTransaction } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createTransaction,
  deleteTransaction,
  fetchOneTransaction,
  fetchTransactions,
  updateTransaction,
} from './transactionThunks';

export interface TransactionsState {
  items: MergedTransaction[];
  fetchLoading: boolean;
  deleteLoading: false | string;
  createLoading: boolean;
  updateLoading: boolean;
  fetchOneLoading: boolean;
  oneTransaction: null | ApiTransaction;
}

const initialState: TransactionsState = {
  items: [],
  fetchLoading: false,
  deleteLoading: false,
  createLoading: false,
  updateLoading: false,
  fetchOneLoading: false,
  oneTransaction: null,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, { payload: transactions }) => {
          state.items = transactions;
          state.fetchLoading = false;
        },
      )
      .addCase(fetchTransactions.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(createTransaction.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createTransaction.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(deleteTransaction.pending, (state, { meta: { arg: id } }) => {
        state.deleteLoading = id;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(updateTransaction.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateTransaction.rejected, (state) => {
        state.updateLoading = false;
      });

    builder
      .addCase(fetchOneTransaction.pending, (state) => {
        state.oneTransaction = null;
        state.fetchOneLoading = true;
      })
      .addCase(
        fetchOneTransaction.fulfilled,
        (state, { payload: apiTransaction }) => {
          state.oneTransaction = apiTransaction;
          state.fetchOneLoading = false;
        },
      )
      .addCase(fetchOneTransaction.rejected, (state) => {
        state.fetchOneLoading = false;
      });
  },
  selectors: {
    selectTransactions: (state) => state.items,
    selectFetchTransactionsLoading: (state) => state.fetchLoading,
    selectCreateTransactionLoading: (state) => state.createLoading,
    selectDeleteTransactionLoading: (state) => state.deleteLoading,
    selectUpdateTransactionLoading: (state) => state.updateLoading,
    selectOneTransactionLoading: (state) => state.fetchOneLoading,
    selectOneTransaction: (state) => state.oneTransaction,
  },
});

export const transactionsReducer = transactionsSlice.reducer;

export const {
  selectTransactions,
  selectFetchTransactionsLoading,
  selectCreateTransactionLoading,
  selectDeleteTransactionLoading,
  selectUpdateTransactionLoading,
  selectOneTransactionLoading,
  selectOneTransaction,
} = transactionsSlice.selectors;
