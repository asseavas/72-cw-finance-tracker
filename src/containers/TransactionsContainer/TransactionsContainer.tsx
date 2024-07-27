import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteTransaction,
  fetchTransactions,
} from '../../store/transactionThunks';
import {
  selectDeleteTransactionLoading,
  selectFetchTransactionsLoading,
  selectTransactions,
} from '../../store/transactionSlice';
import Spinner from '../../components/Spinner/Spinner';
import TransactionItem from '../../components/Transactions/TransactionItem';
import { toast } from 'react-toastify';

const TransactionsContainer = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const isFetching = useAppSelector(selectFetchTransactionsLoading);
  const deleteLoading = useAppSelector(selectDeleteTransactionLoading);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const totalAmount = transactions.reduce((total, transaction) => {
    total =
      transaction.type === 'income'
        ? total + transaction.amount
        : total - transaction.amount;
    return total;
  }, 0);

  const removeTransaction = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete?')) {
        await dispatch(deleteTransaction(id)).unwrap();
        await dispatch(fetchTransactions());
        toast.success('Transaction deleted!');
      }
    } catch (e) {
      toast.error('Could not delete transaction!');
    }
  };

  return (
    <div>
      <div className="d-flex gap-4 align-items-center pt-2 mb-4">
        <h2 className="m-0">Transactions</h2>
        <p className="m-0 fs-5 bg-body-secondary px-3 py-2 rounded-3">
          Total: <strong>{totalAmount}</strong>
        </p>
      </div>
      {isFetching && <Spinner />}
      {!isFetching && transactions.length === 0 && (
        <p className="text-center mb-5">No transactions available.</p>
      )}
      {!isFetching && transactions.length > 0 && (
        <div className="d-flex align-items-center flex-column gap-3 mb-3">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              deleteLoading={deleteLoading}
              onDelete={() => removeTransaction(transaction.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsContainer;
