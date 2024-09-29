import React from 'react';

const CategorySelector = ({ categories, onCategoryChange, selectedCategory }) => {
  return (
    <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category.slug} value={category.slug}>
          {category.name}  {/* Render category name */}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;
