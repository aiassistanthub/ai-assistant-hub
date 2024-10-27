'use client'

import { CategoryGroup, Category } from '../types';
import { ChevronRight } from 'lucide-react';

interface CategoryGroupListProps {
  groups: CategoryGroup[];
  onSelectCategory: (category: Category) => void;
}

export default function CategoryGroupList({ groups, onSelectCategory }: CategoryGroupListProps) {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">表示するカテゴリーが選択されていません。</p>
        <p className="text-gray-500">設定から表示するカテゴリーを選択してください。</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.id} className="space-y-4">
          <div className="border-b border-gray-200 pb-2">
            <h2 className="text-2xl font-bold text-gray-900">{group.name}</h2>
            <p className="text-gray-600">{group.description}</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory(category)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-left w-full"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-6 w-6 text-indigo-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{category.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}