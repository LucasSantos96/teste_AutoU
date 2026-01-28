import React from 'react'
import { useTheme } from '../../app/ThemeContext.tsx'

export const OrDivider: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`flex items-center gap-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
      <span className={`h-px flex-1 ${isDark ? 'bg-slate-700/80' : 'bg-slate-300'}`} />
      <span className={`text-xs uppercase tracking-[0.15em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
        ou
      </span>
      <span className={`h-px flex-1 ${isDark ? 'bg-slate-700/80' : 'bg-slate-300'}`} />
    </div>
  )
}

