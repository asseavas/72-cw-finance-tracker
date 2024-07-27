import { useEffect } from 'react';
import { fetchOneCategory, updateCategory } from '../../store/categoryThunks';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectOneCategory,
  selectOneCategoryLoading,
  selectUpdateCategoryLoading,
} from '../../store/categorySlice';
import { ApiCategory } from '../../types';
import Spinner from '../../components/Spinner/Spinner';
import CategoryForm from '../../components/CategoryForm/CategoryForm';

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectOneCategoryLoading);
  const isUpdating = useAppSelector(selectUpdateCategoryLoading);
  const category = useAppSelector(selectOneCategory);

  const onSubmit = async (apiCategory: ApiCategory) => {
    try {
      await dispatch(updateCategory({ id, apiCategory })).unwrap();
      navigate(`/categories`);
      toast.success('Category updated!');
    } catch (error) {
      toast.error('Could not update category!');
    }
  };

  useEffect(() => {
    dispatch(fetchOneCategory(id));
  }, [dispatch, id]);

  return (
    <div className="row mt-2">
      <div className="col d-flex align-items-center flex-column">
        {isFetching && <Spinner />}
        {category && (
          <CategoryForm
            onSubmit={onSubmit}
            existingCategory={category}
            isLoading={isUpdating}
          />
        )}
      </div>
    </div>
  );
};

export default EditCategory;
