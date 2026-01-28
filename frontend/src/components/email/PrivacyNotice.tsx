import React from 'react'
import { Shield } from 'lucide-react'
import { useTheme } from '../../app/ThemeContext.tsx'

export const PrivacyNotice: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`flex items-start gap-2 text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
      <span
        className={`mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-full border ${
          isDark
            ? 'border-slate-600/80 bg-slate-900/80 text-slate-300'
            : 'border-slate-300 bg-white text-slate-500'
        }`}
      >
        <Shield className="h-2.5 w-2.5" />
      </span>
      <p>Seus dados são processados de forma privada e segura.</p>
    </div>
  )
}

