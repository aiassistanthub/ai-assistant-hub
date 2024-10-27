import { create } from 'zustand';
import { CategoryGroup } from '../types';
import { categoryGroups as defaultGroups } from '../data/categoryGroups';
import { getCompanyCategories } from '../services/supabase';

interface CategoryState {
  categoryGroups: CategoryGroup[];
  loading: boolean;
  error: string | null;
  fetchCompanyCategories: (companyId: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categoryGroups: defaultGroups,
  loading: false,
  error: null,
  fetchCompanyCategories: async (companyId: string) => {
    if (!companyId) return;

    set({ loading: true, error: null });
    try {
      const companyCategories = await getCompanyCategories(companyId);
      
      // 企業専用のカテゴリーとデフォルトのカテゴリーをマージ
      const mergedGroups = defaultGroups.map(defaultGroup => {
        const companyGroup = companyCategories.find(cg => cg.id === defaultGroup.id);
        if (companyGroup) {
          return {
            ...defaultGroup,
            categories: [...defaultGroup.categories, ...companyGroup.categories]
          };
        }
        return defaultGroup;
      });

      // 企業専用の新しいグループを追加
      const newGroups = companyCategories.filter(
        cg => !defaultGroups.some(dg => dg.id === cg.id)
      );

      set({ 
        categoryGroups: [...mergedGroups, ...newGroups],
        loading: false 
      });
    } catch (error) {
      set({ 
        error: '企業カテゴリーの取得に失敗しました',
        loading: false 
      });
    }
  }
}));