import React, { useState } from 'react';
import { ApiTransaction, Category, TransactionMutation } from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (transaction: ApiTransaction) => void;
  existingTransaction?: ApiTransaction;
  isLoading?: boolean;
  categories: Category[];
}

const emptyState: TransactionMutation = {
  type: '',
  category: '',
  amount: '',
};

const TransactionForm: React.FC<Props> = ({
  onSubmit,
  existingTransaction,
  isLoading = false,
  categories,
}) => {
  const initialState: TransactionMutation = existingTransaction
    ? {
        ...existingTransaction,
        amount: existingTransaction.amount.toString(),
        type: '',
      }
    : emptyState;
  const [transactionMutation, setTransactionMutation] =
    useState<TransactionMutation>(initialState);

  const onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setTransactionMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const now = new Date();
    const createdAt = now.toISOString();

    const selectedCategory = categories.find(
      (category) => category.name === transactionMutation.category,
    );

    const categoryId = selectedCategory ? selectedCategory.id : '';

    onSubmit({
      category: categoryId,
      createdAt,
      amount: parseFloat(transactionMutation.amount),
    });
  };

  const filteredCategories = categories.filter(
    (category) => category.type === transactionMutation.type,
  );

  return (
    <form
      onSubmit={onFormSubmit}
      className="d-flex flex-column gap-3 px-3 w-75"
    >
      <h4>
        {existingTransaction ? 'Edit transaction' : 'Add new transaction'}
      </h4>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select
          name="type"
          className="form-select bg-body-secondary border-0 rounded-3 p-2"
          aria-label="Default select example"
          required
          onChange={onFieldChange}
          value={transactionMutation.type}
        >
          <option value="" aria-required>
            Type
          </option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          className="form-select bg-body-secondary border-0 rounded-3 p-2"
          aria-label="Default select example"
          required
          onChange={onFieldChange}
          value={transactionMutation.category}
        >
          <option value="" aria-required>
            Category
          </option>
          {filteredCategories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          required
          className="form-control bg-body-secondary border-0 rounded-3 p-2"
          onChange={onFieldChange}
          value={transactionMutation.amount}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-3"
        disabled={isLoading}
      >
        {isLoading && <ButtonSpinner />}
        {existingTransaction ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default TransactionForm;
