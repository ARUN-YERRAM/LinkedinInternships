import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from './redux/slices/productSlice';
import CategorySelector from './components/CategorySelector';
import ProductList from './components/ProductList';
import { useNavigate } from 'react-router-dom';  // Removed 'useLocation'

const App = () => {
  const dispatch = useDispatch();
  const { categories, products } = useSelector((state) => state.products);

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts({ page, category: selectedCategory, search: searchTerm }));
  }, [dispatch, page, selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
    navigate(`?category=${category}&search=${searchTerm}`);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <CategorySelector categories={categories} onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
      <ProductList products={products} loadMore={loadMore} />
    </div>
  );
};

export default App;
