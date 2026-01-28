import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../app/ThemeContext.tsx'

interface PageContainerProps {
  children: React.ReactNode
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div
      className={`min-h-screen w-full flex justify-center px-4 md:px-6 lg:px-8 ${
        isDark ? 'bg-slate-950 text-slate-50' : 'bg-slate-100 text-slate-900'
      }`}
    >
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium shadow-sm transition ${
            isDark
              ? 'bg-slate-900/80 border-slate-700/70 text-slate-100 hover:bg-slate-800'
              : 'bg-white/90 border-slate-200 text-slate-700 hover:bg-white'
          }`}
          aria-label="Alternar tema"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
      {children}
    </div>
  )
}

