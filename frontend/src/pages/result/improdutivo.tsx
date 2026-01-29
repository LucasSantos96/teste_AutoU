import React, { useMemo, useState } from 'react'
import { PageContainer } from '../../components/common/PageContainer'
import { PrimaryButton } from '../../components/common/PrimaryButton'
import { Archive, ChevronLeft, Info, Edit3, RefreshCcw } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import { useTheme } from '../../app/ThemeContext.tsx'

const FALLBACK_RESPONSE = `"Olá, agradecemos o seu contato.

Sua mensagem foi classificada como IMPRODUTIVA e não requer ação imediata.

Caso tenha alguma dúvida ou solicitação específica, por favor, nos envie uma nova mensagem com mais detalhes.

Atenciosamente,
Equipe de Atendimento."`

const ROTA_API = import.meta.env.VITE_ROUTE_API as string

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
  const location = useLocation()
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const { responseText } = useMemo(() => {
    const state = location.state as
      | { response_text?: string; processed_text?: string; category?: string }
      | null

    return {
      responseText: state?.response_text?.trim() || FALLBACK_RESPONSE,
    }
  }, [location.state])

  const handleGoBack = () => {
    navigate('/')
  }

  const handleReload = async () => {
    const state = location.state as
      | { response_text?: string; processed_text?: string; category?: string }
      | null

    const baseText = state?.processed_text?.trim()

    if (!baseText) {
      alert('Não foi possível reprocessar: conteúdo original indisponível.')
      return
    }

    const formData = new FormData()
    formData.append('text', baseText)

    try {
      const response = await fetch(ROTA_API, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Erro ao reprocessar email: ${response.status}`)
      }

      const data = await response.json()
      const result: 'productive' | 'unproductive' =
        data.category === 'productive' ? 'productive' : 'unproductive'

      if (result === 'productive') {
        navigate('/productive', { state: data })
      } else {
        navigate('/unproductive', { state: data })
      }
    } catch (error) {
      console.error(error)
      alert('Ocorreu um erro ao reprocessar o email. Tente novamente em instantes.')
    }
  }

  const handleCopy = async () => {
    await copyToClipboard(responseText)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <PageContainer>
      <div className="flex flex-col h-full max-w-md w-full mx-auto py-6 md:py-8 lg:py-10">
        <header className="flex items-center justify-between">
          <button
            type="button"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
              isDark
                ? 'bg-slate-900/80 border-slate-700/70 text-slate-200 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            aria-label="Voltar"
            onClick={handleGoBack}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Resultado da Análise
          </h1>
          <button
            type="button"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
              isDark
                ? 'bg-slate-900/80 border-slate-700/70 text-slate-200 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            aria-label="Reanalisar"
            onClick={handleReload}
          >
            <RefreshCcw className="h-4 w-4" />
          </button>
        </header>

        <main className="mt-6 flex-1 flex flex-col gap-6">
          <section>
            <p
              className={`text-xs font-medium uppercase tracking-[0.16em] ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Categoria do Email:
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-2xl px-4 py-2 border ${
                  isDark ? 'bg-red-900/60 border-red-700/70' : 'bg-red-50 border-red-200'
                }`}
              >
                <span className={`mr-2 flex h-2 w-2 rounded-full ${isDark ? 'bg-red-400' : 'bg-red-500'}`} />
                <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-red-200' : 'text-red-600'}`}>
                  IMPRODUTIVO
                </span>
              </span>
              <button
                type="button"
                className={`inline-flex items-center gap-1 rounded-2xl px-3 py-2 border text-xs transition-colors ${
                  isDark
                    ? 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:bg-slate-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Info className="h-3.5 w-3.5" />
                <span>Spam/Irrelevante</span>
              </button>
            </div>
          </section>


          <section className="flex-1 flex flex-col">
            <h2 className={`text-base font-semibold ${isDark ? 'text-slate-50' : 'text-slate-900'}`}>
              Resposta Automática Sugerida
            </h2>

            <div
              className={`mt-4 rounded-3xl overflow-hidden border ${
                isDark
                  ? 'bg-linear-to-b from-red-950 via-slate-950 to-slate-950 border-slate-800/80'
                  : 'bg-white border-slate-200 shadow-lg shadow-slate-200/80'
              }`}
            >
              <div className="h-6 flex items-center justify-center">
              </div>

              <div className={`px-4 py-3 flex items-center gap-2 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white">
                  <span className="text-xs font-bold">IA</span>
                </span>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Sugestão de Resposta</p>
              </div>

              <div className="px-5 pt-1 pb-4">
                <div className={`rounded-2xl px-4 py-3 border ${isDark ? 'bg-slate-900/80 border-slate-700/80' : 'bg-slate-50 border-slate-200'}`}>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-100/90' : 'text-slate-800'}`}>{responseText}</p>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <PrimaryButton
                    label="Copiar Resposta"
                    className="flex-1 justify-center"
                    onClick={handleCopy}
                  />
                  <button
                    type="button"
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      isDark ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-700'
                    }`}
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
              className={`flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
                isDark
                  ? 'border-slate-700 bg-slate-900/70 text-slate-100 hover:bg-slate-800'
                  : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Archive className="h-4 w-4" />
              <span>Arquivar Permanentemente</span>
            </button>

            <div className="pt-1">
              <p className={`text-[11px] tracking-[0.24em] text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                MARCAR COMO FALSO POSITIVO
              </p>
            </div>
          </section>
        </main>
      </div>
    </PageContainer>
  )
}

