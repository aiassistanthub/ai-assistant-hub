'use client'

import { useState } from 'react';
import { Brain, Settings } from 'lucide-react';
import CategoryGroupListWrapper from './CategoryGroupListWrapper';
import SettingsDialog from './SettingsDialog';
import { categoryGroups } from '../data/categoryGroups';
import { useSettings } from '../hooks/useSettings';

export default function HomeContent() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { updateSettings } = useSettings();

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
              <Settings className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryGroupListWrapper />
      </main>

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        categoryGroups={categoryGroups}
      />
    </div>
  );
}