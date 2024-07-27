import React, { useState } from 'react';
import { ApiCategory } from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (category: ApiCategory) => void;
  existingCategory?: ApiCategory;
  isLoading?: boolean;
}

const emptyState: ApiCategory = {
  type: '',
  name: '',
};

const CategoryForm: React.FC<Props> = ({
  onSubmit,
  existingCategory,
  isLoading,
}) => {
  const initialState: ApiCategory = existingCategory || emptyState;
  const [category, setCategory] = useState<ApiCategory>(initialState);

  const onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      ...category,
    });
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="d-flex flex-column gap-3 px-3 w-75"
    >
      <h4>{existingCategory ? 'Edit category' : 'Add new category'}</h4>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select
          name="type"
          className="form-select bg-body-secondary border-0 rounded-3 p-2"
          aria-label="Default select example"
          required
          onChange={onFieldChange}
          value={category.type}
        >
          <option value="" aria-required>
            Type
          </option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="form-control bg-body-secondary border-0 rounded-3 p-2"
          onChange={onFieldChange}
          value={category.name}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-3"
        disabled={isLoading}
      >
        {isLoading && <ButtonSpinner />}
        {existingCategory ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default CategoryForm;
