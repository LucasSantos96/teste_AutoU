import React from 'react'
import { UploadCloud } from 'lucide-react'

export const UploadCard: React.FC = () => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-600/70 bg-slate-900/60 px-5 py-7 shadow-inner">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-blue-400">
          <UploadCloud className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-50">Upload de Arquivo</h2>
          <p className="mt-1 text-xs text-slate-300/80">
            Arraste arquivos <span className="font-medium text-slate-100">.txt</span> ou{' '}
            <span className="font-medium text-slate-100">.pdf</span> aqui
          </p>
        </div>

        <button
          type="button"
          className="mt-3 inline-flex items-center justify-center rounded-2xl bg-slate-100/90 px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-white transition-colors"
        >
          Selecionar Arquivo
        </button>
      </div>
    </div>
  )
}

