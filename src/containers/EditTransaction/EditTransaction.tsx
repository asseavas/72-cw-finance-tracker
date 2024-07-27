import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ApiTransaction } from '../../types';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import {
  fetchOneTransaction,
  updateTransaction,
} from '../../store/transactionThunks';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import {
  selectOneTransaction,
  selectOneTransactionLoading,
  selectUpdateTransactionLoading,
} from '../../store/transactionSlice';
import { selectCategories } from '../../store/categorySlice';

const EditTransaction = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectOneTransactionLoading);
  const isUpdating = useAppSelector(selectUpdateTransactionLoading);
  const transaction = useAppSelector(selectOneTransaction);
  const categories = useAppSelector(selectCategories);

  const onSubmit = async (apiTransaction: ApiTransaction) => {
    try {
      await dispatch(updateTransaction({ id, apiTransaction })).unwrap();
      navigate(`/`);
      toast.success('Transaction updated!');
    } catch (error) {
      toast.error('Could not update transaction!');
    }
  };

  useEffect(() => {
    dispatch(fetchOneTransaction(id));
  }, [dispatch, id]);

  return (
    <div className="row mt-2">
      <div className="col d-flex align-items-center flex-column">
        {isFetching && <Spinner />}
        {transaction && (
          <TransactionForm
            onSubmit={onSubmit}
            existingTransaction={transaction}
            isLoading={isUpdating}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default EditTransaction;
