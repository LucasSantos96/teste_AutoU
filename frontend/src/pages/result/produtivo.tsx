import React, { useMemo, useState } from 'react'
import { PageContainer } from '../../components/common/PageContainer'
import { PrimaryButton } from '../../components/common/PrimaryButton'
import { ChevronLeft, RefreshCcw, ThumbsUp, ThumbsDown, Copy, Edit3 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import { useTheme } from '../../app/ThemeContext.tsx'

const FALLBACK_RESPONSE = `"Prezado cliente,

Agradecemos o seu contato. Sua mensagem foi classificada como PRODUTIVA e já foi encaminhada para análise pela nossa equipe.

Em breve você receberá um retorno com mais detalhes.

Atenciosamente,
Equipe de Atendimento"`

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

export const ProdutivoResultPage: React.FC = () => {
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
            Análise de Email
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
            <div
              className={`mt-3 inline-flex items-center rounded-2xl px-4 py-2 border ${
                isDark
                  ? 'bg-emerald-900/50 border-emerald-700/70'
                  : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <span className={`h-2 w-2 rounded-full mr-2 ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
              <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`}>
                PRODUTIVO
              </span>
            </div>
          </section>

          <section className="flex-1 flex flex-col">
            <div>
              <h2 className={`text-base font-semibold ${isDark ? 'text-slate-50' : 'text-slate-900'}`}>
                Resposta Automática Sugerida
              </h2>
              <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Gerada automaticamente pela IA baseada no contexto.
              </p>
            </div>

            <div className="mt-4 flex-1 flex flex-col">
              <div
                className={`relative rounded-3xl overflow-hidden flex-1 flex flex-col border ${
                  isDark ? 'bg-slate-900/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-lg shadow-slate-200/80'
                }`}
              >
                <div className={`h-1.5 w-full ${isDark ? 'bg-linear-to-r from-blue-500 to-blue-400' : 'bg-blue-500'}`} />
                <div className="p-5 flex-1">
                  <p className={`text-sm leading-relaxed whitespace-pre-line ${isDark ? 'text-slate-100/90' : 'text-slate-800'}`}>
                    {responseText}
                  </p>
                </div>

                <div className={`px-5 py-3 flex items-center justify-between gap-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <div className="flex items-center gap-2">
                    <IconCircleButton
                      icon={Copy}
                      label="Copiar"
                      onClick={handleCopy}
                      isDark={isDark}
                    />
                    <IconCircleButton icon={Edit3} label="Editar" isDark={isDark} />
                  </div>
                  <PrimaryButton label="Enviar" />
                </div>
              </div>
            </div>
          </section>

          {copied && (
            <section className="pt-1 -mt-3">
              <p className="text-[11px] text-center text-emerald-400">Resposta copiada para a área de transferência.</p>
            </section>
          )}

          <section className="pb-4">
            <p className={`text-xs tracking-[0.22em] text-center mb-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              A CLASSIFICAÇÃO FOI ÚTIL?
            </p>
            <div className="flex items-center justify-center gap-6">
              <FeedbackButton icon={ThumbsUp} ariaLabel="Classificação útil" isDark={isDark} />
              <FeedbackButton icon={ThumbsDown} ariaLabel="Classificação não útil" isDark={isDark} />
            </div>
          </section>
        </main>
      </div>
    </PageContainer>
  )
}

interface IconCircleButtonProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  onClick?: () => void
  isDark: boolean
}

const IconCircleButton: React.FC<IconCircleButtonProps> = ({ icon: Icon, label, onClick, isDark }) => {
  return (
    <button
      type="button"
      className={`flex flex-col items-center gap-1 text-[11px] transition-transform active:scale-95 ${
        isDark ? 'text-slate-300' : 'text-slate-600'
      }`}
      onClick={onClick}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          isDark ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-700'
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span>{label}</span>
    </button>
  )
}

interface FeedbackButtonProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  ariaLabel: string
  isDark: boolean
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ icon: Icon, ariaLabel, isDark }) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
        isDark
          ? 'border-slate-700 bg-slate-900/60 text-slate-300 hover:bg-slate-800'
          : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
      }`}
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}

