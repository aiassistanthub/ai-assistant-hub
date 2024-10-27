'use client'

import { Category } from '@/types'

interface InputFormProps {
  category: Category
  onSubmit: (inputs: Record<string, string>) => void
}

export default function InputForm({ category, onSubmit }: InputFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const inputs = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, value.toString()])
    )
    onSubmit(inputs)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{category.name}</h2>
        <p className="text-gray-600 mb-6">{category.description}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {category.inputs.map((input) => (
            <div key={input.id}>
              <label htmlFor={input.id} className="block text-sm font-medium text-gray-700 mb-1">
                {input.label}
              </label>
              {input.type === 'textarea' ? (
                <textarea
                  id={input.id}
                  name={input.id}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows={4}
                  required
                />
              ) : (
                <input
                  type="text"
                  id={input.id}
                  name={input.id}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              )}
              {input.description && (
                <p className="mt-1 text-sm text-gray-500">{input.description}</p>
              )}
            </div>
          ))}
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            開始
          </button>
        </form>
      </div>
    </div>
  )
}