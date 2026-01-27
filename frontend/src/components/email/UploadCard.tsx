import React, { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

interface UploadCardProps {
  onFileSelected: (file: File) => void
  selectedFileName?: string | null
}

const ACCEPTED_TYPES = ['text/plain', 'application/pdf']

const isAcceptedFile = (file: File) => {
  if (ACCEPTED_TYPES.includes(file.type)) return true
  const lower = file.name.toLowerCase()
  return lower.endsWith('.txt') || lower.endsWith('.pdf')
}

export const UploadCard: React.FC<UploadCardProps> = ({ onFileSelected, selectedFileName }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const [file] = Array.from(files)
    if (!file) return
    if (!isAcceptedFile(file)) {
      // Aqui poderíamos exibir um toast; por enquanto apenas ignoramos tipos inválidos.
      return
    }
    onFileSelected(file)
  }

  const handleClickSelect = () => {
    inputRef.current?.click()
  }

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!isDragging) {
      setIsDragging(true)
    }
  }

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
    handleFiles(event.dataTransfer.files)
  }

  return (
    <div
      className={`rounded-3xl border border-dashed px-5 py-7 shadow-inner transition ${
        isDragging ? 'border-blue-500 bg-slate-900/80' : 'border-slate-600/70 bg-slate-900/60'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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
          {selectedFileName && (
            <p className="mt-2 text-[11px] text-slate-400">
              Arquivo selecionado:{' '}
              <span className="font-medium text-slate-100 break-all">{selectedFileName}</span>
            </p>
          )}
        </div>

        <button
          type="button"
          className="mt-3 inline-flex items-center justify-center rounded-2xl bg-slate-100/90 px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-white transition-colors"
          onClick={handleClickSelect}
        >
          Selecionar Arquivo
        </button>

        <input
          ref={inputRef}
          type="file"
          accept=".txt,application/pdf"
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </div>
    </div>
  )
}

