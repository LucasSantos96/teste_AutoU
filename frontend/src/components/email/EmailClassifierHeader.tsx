import React from 'react'
import { ChevronLeft } from 'lucide-react'

export const  EmailClassifierHeader: React.FC = () => {
  return (
    <header className="flex items-center gap-3">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/80 border border-slate-700/70 text-slate-200 hover:bg-slate-800 transition-colors"
        aria-label="Voltar"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <span className="text-sm font-medium text-slate-200">Email Classifier</span>
    </header>
  )
}
