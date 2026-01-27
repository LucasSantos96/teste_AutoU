import React from 'react'

interface PageContainerProps {
  children: React.ReactNode
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-50 flex justify-center px-4 md:px-6 lg:px-8">
      {children}
    </div>
  )
}

