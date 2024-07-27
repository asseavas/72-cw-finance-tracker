import React, { useEffect } from 'react';
import { deleteCategory, fetchCategories } from '../../store/categoryThunks';
import {
  selectCategories,
  selectDeleteCategoryLoading,
  selectFetchCategoriesLoading,
} from '../../store/categorySlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import CategoryItem from '../../components/Categories/CategoryItem';

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const deleteLoading = useAppSelector(selectDeleteCategoryLoading);
  const categoriesLoading = useAppSelector(selectFetchCategoriesLoading);

  const removeCategory = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete?')) {
        await dispatch(deleteCategory(id)).unwrap();
        await dispatch(fetchCategories());
        toast.success('Category deleted!');
      }
    } catch (e) {
      toast.error('Could not delete Category!');
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="w-100 d-flex flex-column align-items-center gap-3">
      {categoriesLoading ? (
        <Spinner />
      ) : (
        categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onDelete={() => removeCategory(category.id)}
            deleteLoading={deleteLoading}
          />
        ))
      )}
    </div>
  );
};

export default Categories;
