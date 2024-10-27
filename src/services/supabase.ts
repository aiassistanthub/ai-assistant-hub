import { createClient } from '@supabase/supabase-js';
import { CategoryGroup } from '../types';

// 環境変数をprocess.envから取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// URLとキーが存在するか確認
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getCompanyCategories(companyId: string): Promise<CategoryGroup[]> {
  const { data, error } = await supabase
    .from('company_categories')
    .select(`
      id,
      name,
      description,
      icon,
      company_id,
      inputs,
      group_id,
      dify_application_id
    `)
    .eq('company_id', companyId);

  if (error) {
    console.error('Error fetching company categories:', error);
    return [];
  }

  // カテゴリーをグループごとに整理
  const groupedCategories = data.reduce((acc: { [key: string]: any[] }, category) => {
    if (!acc[category.group_id]) {
      acc[category.group_id] = [];
    }
    acc[category.group_id].push({
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      inputs: category.inputs,
      difyApplicationId: category.dify_application_id,
      companyId: category.company_id
    });
    return acc;
  }, {});

  // グループ情報を取得
  const { data: groups, error: groupError } = await supabase
    .from('category_groups')
    .select('*')
    .in('id', Object.keys(groupedCategories));

  if (groupError) {
    console.error('Error fetching category groups:', groupError);
    return [];
  }

  // groupsがnullでないことを確認
  if (!groups) {
    return [];
  }

  return groups.map(group => ({
    id: group.id,
    name: group.name,
    description: group.description,
    categories: groupedCategories[group.id] || []
  }));
}