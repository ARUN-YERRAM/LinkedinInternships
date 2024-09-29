import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from './redux/slices/productSlice';
import CategorySelector from './components/CategorySelector';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const { categories, products } = useSelector((state) => state.products);

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();
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

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setPage(1);
    navigate(`?category=${selectedCategory}&search=${term}`);
  };


  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearchChange} />
      <CategorySelector categories={categories} onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
      <ProductList products={products} loadMore={loadMore} />
    </div>
  );
};

export default App;

/*
Limitations:
1. No server-side rendering or caching is used, so performance might degrade for large datasets.
2. Pagination is implemented without a UI component; instead, products are loaded dynamically in batches.
3. Redux store does not implement advanced memoization or re-fetching strategies.
*/
