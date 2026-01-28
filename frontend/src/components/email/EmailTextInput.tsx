import React from 'react'
import { useTheme } from '../../app/ThemeContext.tsx'

interface EmailTextInputProps {
  value: string
  onChange: (value: string) => void
}

export const EmailTextInput: React.FC<EmailTextInputProps> = ({ value, onChange }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="flex flex-col h-full">
      <label className={`text-sm font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
        Texto do Email
      </label>
      <div className="flex-1">
        <textarea
          className={`min-h-[160px] w-full resize-none rounded-3xl border px-4 py-3 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-500 ${
            isDark
              ? 'border-slate-700 bg-slate-900/70 text-slate-100 placeholder:text-slate-500'
              : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400'
          }`}
          placeholder="Cole aqui o texto do email para análise..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  )
}

