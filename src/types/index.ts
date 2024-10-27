import { LucideIcon } from 'lucide-react';

export interface CategoryGroup {
  id: string;
  name: string;
  description: string;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  inputs: Input[];
}

export interface Input {
  id: string;
  label: string;
  type: 'text' | 'textarea';
  description?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Settings {
  difyApiKey: string;
  difyBaseUrl: string;
  companyId: string;
  visibleCategories: string[];
}