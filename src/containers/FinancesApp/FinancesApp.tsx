import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Layout from '../../components/Layout/Layout';
import Modal from '../../components/Modal/Modal';
import CategoriesContainer from '../CategoriesContainer/CategoriesContainer';
import TransactionsContainer from '../TransactionsContainer/TransactionsContainer';
import EditCategory from '../EditCategory/EditCategory';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import { selectCategories } from '../../store/categorySlice';
import { ApiTransaction } from '../../types';
import {
  createTransaction,
  fetchTransactions,
} from '../../store/transactionThunks';
import { fetchCategories } from '../../store/categoryThunks';
import EditTransaction from '../EditTransaction/EditTransaction';

const FinancesApp = () => {
  const [showModal, setShowModal] = useState(false);
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onSubmit = async (transaction: ApiTransaction) => {
    try {
      const resultAction = await dispatch(createTransaction(transaction));
      unwrapResult(resultAction);
      await dispatch(fetchTransactions());
      setShowModal(false);
      toast.success(`Transaction created`);
    } catch (error) {
      toast.error('Could not create transaction!');
    }
  };

  return (
    <Layout onCLick={() => setShowModal(true)}>
      <Routes>
        <Route path="/" element={<TransactionsContainer />} />
        <Route path="/categories" element={<CategoriesContainer />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
        <Route path="/edit-transaction/:id" element={<EditTransaction />} />
        <Route path="*" element={<h1 className="text-center">Not found!</h1>} />
      </Routes>
      <Modal
        show={showModal}
        title="Add transaction"
        onClose={() => setShowModal(false)}
      >
        <div className="modal-body d-flex flex-column align-items-center">
          <TransactionForm categories={categories} onSubmit={onSubmit} />
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-danger"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default FinancesApp;
