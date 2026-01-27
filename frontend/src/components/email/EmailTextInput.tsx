import React from 'react'

interface EmailTextInputProps {
  value: string
  onChange: (value: string) => void
}

export const EmailTextInput: React.FC<EmailTextInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col h-full">
      <label className="text-sm font-medium text-slate-200 mb-2">Texto do Email</label>
      <div className="flex-1">
        <textarea
          className="min-h-[160px] w-full resize-none rounded-3xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-500"
          placeholder="Cole aqui o texto do email para análise..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  )
}

