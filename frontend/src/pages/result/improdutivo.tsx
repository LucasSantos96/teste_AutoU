import React, { useState } from 'react'
import { PageContainer } from '../../components/common/PageContainer'
import { PrimaryButton } from '../../components/common/PrimaryButton'
import { Archive, ChevronLeft, Info, MoreVertical, Edit3 } from 'lucide-react'
import { useNavigate } from 'react-router'

const IMPRODUTIVO_RESPONSE = `"Olá, agradecemos o seu contato. No momento, não conseguimos dar prosseguimento a esta solicitação. Atenciosamente, Equipe de Suporte."`

const copyToClipboard = async (text: string) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  try {
    document.execCommand('copy')
  } finally {
    document.body.removeChild(textarea)
  }
}

export const ImprodutivoResultPage: React.FC = () => {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const handleGoBack = () => {
    navigate('/')
  }

  const handleCopy = async () => {
    await copyToClipboard(IMPRODUTIVO_RESPONSE)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <PageContainer>
      <div className="flex flex-col h-full max-w-md w-full mx-auto py-6 md:py-8 lg:py-10">
        <header className="flex items-center justify-between">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/80 border border-slate-700/70 text-slate-200 hover:bg-slate-800 transition-colors"
            aria-label="Voltar"
            onClick={handleGoBack}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-sm font-medium text-slate-200">Resultado da Análise</h1>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/80 border border-slate-700/70 text-slate-200 hover:bg-slate-800 transition-colors"
            aria-label="Mais opções"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </header>

        <main className="mt-6 flex-1 flex flex-col gap-6">
          <section>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-[0.16em]">Categoria do Email:</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-2xl bg-red-900/60 px-4 py-2 border border-red-700/70">
                <span className="mr-2 flex h-2 w-2 rounded-full bg-red-400" />
                <span className="text-xs font-semibold text-red-200 tracking-wide">IMPRODUTIVO</span>
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-2xl bg-slate-900/80 px-3 py-2 border border-slate-700/80 text-xs text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <Info className="h-3.5 w-3.5" />
                <span>Spam/Irrelevante</span>
              </button>
            </div>
          </section>


          <section className="flex-1 flex flex-col">
            <h2 className="text-base font-semibold text-slate-50">Resposta Automática Sugerida</h2>

            <div className="mt-4 rounded-3xl bg-linear-to-b from-red-950 via-slate-950 to-slate-950 border border-slate-800/80 overflow-hidden">
              <div className="h-28 flex items-center justify-center">
                <span className="text-4xl font-semibold text-red-500">Rᵒ</span>
              </div>

              <div className="border-t border-slate-800 px-4 py-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white">
                  <span className="text-xs font-bold">IA</span>
                </span>
                <p className="text-xs font-medium text-slate-200">Sugestão de Resposta</p>
              </div>

              <div className="px-5 pt-1 pb-4">
                <div className="rounded-2xl bg-slate-900/80 border border-slate-700/80 px-4 py-3">
                  <p className="text-sm leading-relaxed text-slate-100/90">{IMPRODUTIVO_RESPONSE}</p>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <PrimaryButton
                    label="Copiar Resposta"
                    className="flex-1 justify-center"
                    onClick={handleCopy}
                  />
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-100"
                    aria-label="Editar resposta"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
                
              </div>
            </div>
          </section>

          {copied && (
            <section className="pt-1 -mt-3">
              <p className="text-[11px] text-center text-emerald-400">Resposta copiada para a área de transferência.</p>
            </section>
          )}

          <section className="pb-4 space-y-4">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm font-medium text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <Archive className="h-4 w-4" />
              <span>Arquivar Permanentemente</span>
            </button>

            <div className="pt-1">
              <p className="text-[11px] tracking-[0.24em] text-center text-slate-500">
                MARCAR COMO FALSO POSITIVO
              </p>
            </div>
          </section>
        </main>
      </div>
    </PageContainer>
  )
}

