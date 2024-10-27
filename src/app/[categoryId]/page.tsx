'use client'

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import InputForm from '../../components/InputForm';
import { categoryGroups } from '../../data/categoryGroups';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.categoryId as string;

  const category = categoryGroups
    .flatMap(group => group.categories)
    .find(cat => cat.id === categoryId);

  if (!category) {
    return null;
  }

  const handleSubmit = (inputs: Record<string, string>) => {
    router.push(`/${categoryId}/chat?inputs=${encodeURIComponent(JSON.stringify(inputs))}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        戻る
      </button>

      <InputForm category={category} onSubmit={handleSubmit} />
    </div>
  );
}