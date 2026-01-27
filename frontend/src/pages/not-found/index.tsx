import React from 'react'
import { PageContainer } from '../../components/common/PageContainer'
import { PrimaryButton } from '../../components/common/PrimaryButton'
import { ChevronLeft, Search } from 'lucide-react'
import { useNavigate } from 'react-router'

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <PageContainer>
      <div className="flex flex-col h-full max-w-md w-full mx-auto py-6 md:py-8 lg:py-10">
        <header className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/80 border border-slate-700/70 text-slate-200 hover:bg-slate-800 transition-colors"
            aria-label="Voltar para a Home"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium text-slate-200">Página não encontrada</span>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 border border-slate-700 mb-6">
            <Search className="h-9 w-9 text-slate-400" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-50 mb-2">Ops, nada por aqui...</h1>
          <p className="text-sm text-slate-400 mb-6">
            A página que você tentou acessar não existe ou foi movida. Volte para a tela inicial para continuar a
            classificação de emails.
          </p>
          <PrimaryButton
            label="Voltar para a Home"
            fullWidth
            onClick={() => navigate('/')}
          />
        </main>
      </div>
    </PageContainer>
  )
}

