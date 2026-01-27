import React from 'react'

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  fullWidth?: boolean
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, fullWidth = false, className = '', ...rest }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/40 hover:bg-blue-500 active:bg-blue-700 transition-colors ${
        fullWidth ? 'w-full' : 'w-auto'
      } ${className}`}
      {...rest}
    >
      {label}
    </button>
  )
}

