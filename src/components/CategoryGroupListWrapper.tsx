'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CategoryGroupList from './CategoryGroupList';
import { categoryGroups } from '../data/categoryGroups';
import { Category, CategoryGroup } from '../types';
import { useSettings } from '../hooks/useSettings';

export default function CategoryGroupListWrapper() {
  const router = useRouter();
  const { settings, isLoaded } = useSettings();
  const [filteredGroups, setFilteredGroups] = useState<CategoryGroup[]>([]);

  useEffect(() => {
    if (isLoaded) {
      const newFilteredGroups = settings.visibleCategories.length > 0
        ? categoryGroups.map(group => ({
            ...group,
            categories: group.categories.filter(category => 
              settings.visibleCategories.includes(category.id)
            ),
          })).filter(group => group.categories.length > 0)
        : categoryGroups;
      setFilteredGroups(newFilteredGroups);
    }
  }, [settings, isLoaded]);

  const handleSelectCategory = (category: Category) => {
    router.push(`/${category.id}`);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <CategoryGroupList
      groups={filteredGroups}
      onSelectCategory={handleSelectCategory}
    />
  );
}