'use client'

import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { CategoryGroup } from '../types';
import { useSettings } from '../hooks/useSettings';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categoryGroups: CategoryGroup[];
}

export default function SettingsDialog({ 
  isOpen, 
  onClose, 
  categoryGroups 
}: SettingsDialogProps) {
  const { settings: currentSettings, updateSettings, isLoaded } = useSettings();
  const [localSettings, setLocalSettings] = useState(currentSettings);

  useEffect(() => {
    if (isOpen && isLoaded) {
      setLocalSettings(currentSettings);
    }
  }, [isOpen, currentSettings, isLoaded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    onClose();
    window.location.reload(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">設定</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Dify設定</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">API Key</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={localSettings.difyApiKey}
                onChange={(e) => setLocalSettings({ ...localSettings, difyApiKey: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Base URL</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={localSettings.difyBaseUrl}
                onChange={(e) => setLocalSettings({ ...localSettings, difyBaseUrl: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">企業設定</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">企業ID</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={localSettings.companyId}
                onChange={(e) => setLocalSettings({ ...localSettings, companyId: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">表示カテゴリー設定</h3>
            <div className="space-y-2">
              {categoryGroups.map((group) => (
                <div key={group.id} className="space-y-2">
                  <h4 className="font-medium text-gray-700">{group.name}</h4>
                  {group.categories.map((category) => (
                    <label key={category.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={localSettings.visibleCategories.includes(category.id)}
                        onChange={(e) => {
                          const newCategories = e.target.checked
                            ? [...localSettings.visibleCategories, category.id]
                            : localSettings.visibleCategories.filter(id => id !== category.id);
                          setLocalSettings({ ...localSettings, visibleCategories: newCategories });
                        }}
                      />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Save className="h-4 w-4 mr-2" />
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}