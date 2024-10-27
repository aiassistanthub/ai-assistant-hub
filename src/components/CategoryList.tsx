import React from 'react';
import { Category } from '../data/categories';
import { ChevronRight } from 'lucide-react';

interface CategoryListProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

function CategoryList({ categories, onSelect }: CategoryListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onSelect(category)}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {<category.icon className="h-6 w-6 text-indigo-600" />}
              <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-sm text-gray-600">{category.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;