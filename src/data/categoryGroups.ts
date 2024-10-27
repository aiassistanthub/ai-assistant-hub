import { FileText, PenTool, Presentation, Code, Mail, Target } from 'lucide-react';
import { CategoryGroup } from '@/types';

export const categoryGroups: CategoryGroup[] = [
  {
    id: 'content-creation',
    name: 'コンテンツ作成',
    description: '各種コンテンツの作成支援',
    categories: [
      {
        id: 'seo-article',
        name: 'SEO記事作成',
        description: 'SEOを意識した魅力的な記事を作成',
        icon: PenTool,
        inputs: [
          {
            id: 'keyword',
            label: 'メインキーワード',
            type: 'text',
            description: '記事のメインとなるキーワードを入力してください'
          },
          {
            id: 'title',
            label: '記事タイトル',
            type: 'text'
          },
          {
            id: 'outline',
            label: '記事の概要',
            type: 'textarea',
            description: '記事で伝えたいポイントを簡潔に説明してください'
          }
        ]
      },
      {
        id: 'presentation',
        name: 'プレゼン資料作成',
        description: 'インパクトのあるプレゼン資料を作成',
        icon: Presentation,
        inputs: [
          {
            id: 'topic',
            label: 'テーマ',
            type: 'text'
          },
          {
            id: 'audience',
            label: '対象者',
            type: 'text'
          },
          {
            id: 'goal',
            label: '目的',
            type: 'textarea'
          }
        ]
      }
    ]
  },
  {
    id: 'business',
    name: 'ビジネス',
    description: 'ビジネス文書・戦略立案',
    categories: [
      {
        id: 'meeting-minutes',
        name: '議事録作成',
        description: '会議の音声や要点から議事録を作成',
        icon: FileText,
        inputs: [
          {
            id: 'title',
            label: '会議タイトル',
            type: 'text'
          },
          {
            id: 'participants',
            label: '参加者',
            type: 'text',
            description: '参加者の名前をカンマ区切りで入力してください'
          },
          {
            id: 'content',
            label: '会議内容',
            type: 'textarea',
            description: '会議の主な内容や決定事項を入力してください'
          }
        ]
      },
      {
        id: 'email',
        name: 'ビジネスメール作成',
        description: '適切な文面のビジネスメールを作成',
        icon: Mail,
        inputs: [
          {
            id: 'purpose',
            label: '目的',
            type: 'text'
          },
          {
            id: 'recipient',
            label: '送信先の立場',
            type: 'text'
          },
          {
            id: 'points',
            label: '伝えたいポイント',
            type: 'textarea'
          }
        ]
      }
    ]
  },
  {
    id: 'development',
    name: '開発支援',
    description: '開発関連の各種支援',
    categories: [
      {
        id: 'code-review',
        name: 'コードレビュー',
        description: 'コードの品質チェックと改善提案',
        icon: Code,
        inputs: [
          {
            id: 'language',
            label: 'プログラミング言語',
            type: 'text'
          },
          {
            id: 'code',
            label: 'コード',
            type: 'textarea',
            description: 'レビューしたいコードを貼り付けてください'
          }
        ]
      }
    ]
  }
];