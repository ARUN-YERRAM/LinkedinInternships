import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts, resetProducts } from './redux/slices/productSlice';
import CategorySelector from './components/CategorySelector';
import ProductList from './components/ProductList';
import { useNavigate } from 'react-router-dom';  // removed 'useLocation'

const App = () => {
  const dispatch = useDispatch();
  const { categories, products } = useSelector((state) => state.products);

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());  // Fetching categories initially
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ page, category: selectedCategory, search: searchTerm }));
  }, [dispatch, page, selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
    dispatch(resetProducts());  // Clearing existing products when category changes
    dispatch(fetchProducts({ page: 1, category, search: searchTerm }));
    navigate(`?category=${category}&search=${searchTerm}`);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <CategorySelector 
        categories={categories} 
        onCategoryChange={handleCategoryChange} 
        selectedCategory={selectedCategory} 
      />
      <ProductList products={products} loadMore={loadMore} />
    </div>
  );
};

export default App;

/*
Limitations:
1. Products are loaded in batches, so users might experience a slight delay while scrolling through all products.
2. The app does not handle edge cases for no results found on search queries.
3. The current implementation doesn't handle any advanced caching for Redux store, so the same API call will happen on every category change.
*/
