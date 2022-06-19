import { useSelector } from 'react-redux';
import { useContext } from 'react';

import { CartContext } from '../../contexts/Cart';
import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categoryPreview/CategoriesPreview';
import Category from '../category/Category';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCollectionsAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/category/category.action';
import { selectCategories } from '../../store/category/category.selector.js';

const Shop = () => {
  // const categories = [];
  console.log('render / re-render shop ');
  const categories = useSelector((state) => selectCategories(state));
  // console.log('state2 => ', state2);
  const { addItemToCart } = useContext(CartContext);

  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCollectionsAndDocuments();
      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.tagName.toLowerCase() === 'button') {
      addItem(e);
    }
  };

  const addItem = (e) => {
    const currentId = Number(e.target.parentNode.closest('.id__container').id);
    const clickedItemCategory = e.target.parentNode
      .closest('.category__content')
      .querySelector('.category__name')
      .innerHTML.toLowerCase();

    const currentCategory = categories[clickedItemCategory];
    const currentItem = currentCategory.find(
      (product) => product.id === currentId
    );

    addItemToCart(currentItem);
  };

  return (
    <div onClick={handleClick}>
      <Routes>
        <Route index element={<CategoriesPreview categories={categories} />} />
        <Route
          path=':category'
          element={<Category categories={categories} />}
        />
      </Routes>
    </div>
  );
};

export default Shop;
