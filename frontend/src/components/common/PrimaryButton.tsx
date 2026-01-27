import React from 'react'

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  fullWidth?: boolean
  loading?: boolean
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...rest
}) => {
  const isDisabled = disabled || loading

  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/40 transition active:scale-95 ${
        isDisabled ? 'bg-blue-600/70 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700'
      } ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}
      disabled={isDisabled}
      {...rest}
    >
      {loading && (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
      )}
      {label}
    </button>
  )
}

