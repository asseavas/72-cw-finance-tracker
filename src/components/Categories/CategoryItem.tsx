import React from 'react';
import { Category } from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import { Link } from 'react-router-dom';

interface Props {
  category: Category;
  onDelete: VoidFunction;
  deleteLoading: false | string;
}

const CategoryItem: React.FC<Props> = ({
  category,
  onDelete,
  deleteLoading,
}) => {
  const colorStyle =
    category.type === 'income'
      ? {
          color: 'green',
        }
      : {
          color: 'red',
        };

  return (
    <div className="card rounded-3 pt-3 p-3 w-75">
      <div className="row">
        <h4 className="col-5">{category.name}</h4>
        <h4 className="col-3" style={colorStyle}>
          {category.type}
        </h4>
        <div className="d-flex gap-3 col-4">
          <Link
            className="btn btn-primary ms-auto"
            to={`/edit-category/${category.id}`}
          >
            Edit
          </Link>
          <button
            className="btn btn-danger px-4 rounded-3"
            onClick={onDelete}
            disabled={deleteLoading ? deleteLoading === category.id : false}
          >
            {deleteLoading && deleteLoading === category.id && (
              <ButtonSpinner />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
