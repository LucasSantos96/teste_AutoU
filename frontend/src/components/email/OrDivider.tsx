import React from 'react'

export const OrDivider: React.FC = () => {
  return (
    <div className="flex items-center gap-4 text-slate-400">
      <span className="h-px flex-1 bg-slate-700/80" />
      <span className="text-xs uppercase tracking-[0.15em] text-slate-500">ou</span>
      <span className="h-px flex-1 bg-slate-700/80" />
    </div>
  )
}

