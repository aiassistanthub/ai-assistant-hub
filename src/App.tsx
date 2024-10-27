import React, { useState, useEffect } from 'react';
import { Brain, Settings as SettingsIcon, ArrowLeft } from 'lucide-react';
import CategoryGroupList from './components/CategoryGroupList';
import InputForm from './components/InputForm';
import Chat from './components/Chat';
import SettingsDialog from './components/SettingsDialog';
import { Category, Message } from './types';
import { useSettings } from './hooks/useSettings';
import { useCategoryStore } from './stores/categoryStore';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [chatMode, setChatMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { settings, updateSettings } = useSettings();
  const { categoryGroups, loading, error, fetchCompanyCategories } = useCategoryStore();

  useEffect(() => {
    if (settings.companyId) {
      fetchCompanyCategories(settings.companyId);
    }
  }, [settings.companyId]);

  const handleBack = () => {
    if (chatMode) {
      setChatMode(false);
    } else {
      setSelectedCategory(null);
    }
  };

  const handleSubmit = (inputs: Record<string, string>) => {
    const prompt = `カテゴリー: ${selectedCategory?.name}\n` + 
      Object.entries(inputs).map(([key, value]) => `${key}: ${value}`).join('\n');
    
    setMessages([{ role: 'user', content: prompt }]);
    setChatMode(true);
  };

  const filteredGroups = settings.visibleCategories.length > 0
    ? categoryGroups.map(group => ({
        ...group,
        categories: group.categories.filter(category => 
          settings.visibleCategories.includes(category.id)
        ),
      })).filter(group => group.categories.length > 0)
    : categoryGroups;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">AI Assistant Hub</span>
            </div>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <SettingsIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">カテゴリーを読み込み中...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {(selectedCategory || chatMode) && (
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            戻る
          </button>
        )}

        {!selectedCategory && !chatMode && (
          <CategoryGroupList
            groups={filteredGroups}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {selectedCategory && !chatMode && (
          <InputForm
            category={selectedCategory}
            onSubmit={handleSubmit}
          />
        )}

        {chatMode && (
          <Chat messages={messages} setMessages={setMessages} />
        )}
      </main>

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        categoryGroups={categoryGroups}
        onUpdateSettings={updateSettings}
      />
    </div>
  );
}

export default App;