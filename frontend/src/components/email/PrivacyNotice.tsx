import React from 'react'
import { Shield } from 'lucide-react'

export const PrivacyNotice: React.FC = () => {
  return (
    <div className="flex items-start gap-2 text-[11px] text-slate-500">
      <span className="mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-600/80 bg-slate-900/80 text-slate-300">
        <Shield className="h-2.5 w-2.5" />
      </span>
      <p>Seus dados são processados de forma privada e segura.</p>
    </div>
  )
}

