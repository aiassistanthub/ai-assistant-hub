'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Chat from '../../../components/Chat';
import { useState } from 'react';
import { Message } from '../../../types';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputs = JSON.parse(decodeURIComponent(searchParams.get('inputs') || '{}'));
  
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'user', 
      content: Object.entries(inputs)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        戻る
      </button>

      <Chat messages={messages} setMessages={setMessages} />
    </div>
  );
}