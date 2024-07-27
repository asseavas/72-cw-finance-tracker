import Layout from '../../components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import { useState } from 'react';
import CategoriesContainer from '../CategoriesContainer/CategoriesContainer';
import TransactionsContainer from '../TransactionsContainer/TransactionsContainer';
import EditCategory from '../EditCategory/EditCategory';

const FinancesApp = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Layout onCLick={() => setShowModal(true)}>
      <Routes>
        <Route path="/" element={<TransactionsContainer />} />
        <Route path="/categories" element={<CategoriesContainer />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
        <Route path="*" element={<h1 className="text-center">Not found!</h1>} />
      </Routes>
      <Modal
        show={showModal}
        title="Add transaction"
        onClose={() => setShowModal(false)}
      >
        <div className="modal-body">Transaction</div>
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
