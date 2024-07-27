import Modal from '../../components/Modal/Modal';
import { useState } from 'react';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import { ApiCategory } from '../../types';
import { toast } from 'react-toastify';
import { createCategory, fetchCategories } from '../../store/categoryThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCreateCategoryLoading } from '../../store/categorySlice';
import Categories from './Categories';

const CategoriesContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreateCategoryLoading);

  const onSubmit = async (category: ApiCategory) => {
    try {
      await dispatch(createCategory(category)).unwrap();
      await dispatch(fetchCategories());
      setShowModal(false);
      toast.success(`Category created`);
    } catch (error) {
      toast.error('Could not create Category!');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center pt-2 pb-3 mb-3">
        <h2 className="m-0">Categories</h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Add new category
        </button>
      </div>
      <div className="d-flex align-items-center flex-column">
        <Categories />
      </div>
      <Modal
        show={showModal}
        title="Category"
        onClose={() => setShowModal(false)}
      >
        <div className="modal-body d-flex align-items-center flex-column">
          <CategoryForm onSubmit={onSubmit} isLoading={isCreating} />
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
    </>
  );
};

export default CategoriesContainer;
