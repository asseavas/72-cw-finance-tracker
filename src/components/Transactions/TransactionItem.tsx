import React from 'react';
import { MergedTransaction } from '../../types';
import { Link } from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import dayjs from 'dayjs';

interface Props {
  transaction: MergedTransaction;
  onDelete: VoidFunction;
  deleteLoading: false | string;
}

const TransactionItem: React.FC<Props> = ({
  transaction,
  onDelete,
  deleteLoading,
}) => {
  const isIncome = transaction.type === 'income';

  const colorStyle = isIncome ? { color: 'green' } : { color: 'red' };
  const sign = isIncome ? '+' : '-';

  return (
    <div className="card rounded-3 pt-3 p-3 w-100">
      <div className="row">
        <h5 className="col-3">
          {dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}
        </h5>
        <h5 className="col-3">{transaction.categoryName}</h5>
        <h5 style={colorStyle} className="col-3">
          {sign}
          {transaction.amount}
        </h5>
        <div className="d-flex gap-3 col-3">
          <Link
            className="btn btn-primary ms-auto"
            to={`/edit-transaction/${transaction.id}`}
          >
            Edit
          </Link>
          <button
            className="btn btn-danger px-4 rounded-3"
            onClick={onDelete}
            disabled={deleteLoading ? deleteLoading === transaction.id : false}
          >
            {deleteLoading && deleteLoading === transaction.id && (
              <ButtonSpinner />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
