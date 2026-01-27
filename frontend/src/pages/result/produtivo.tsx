import React from 'react'
import { PageContainer } from '../../components/common/PageContainer'
import { PrimaryButton } from '../../components/common/PrimaryButton'
import { ChevronLeft, RefreshCcw, ThumbsUp, ThumbsDown, Copy, Edit3 } from 'lucide-react'

export const ProdutivoResultPage: React.FC = () => {
  return (
    <PageContainer>
      <div className="flex flex-col h-full max-w-md w-full mx-auto py-6 md:py-8 lg:py-10">
        <header className="flex items-center justify-between">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/80 border border-slate-700/70 text-slate-200 hover:bg-slate-800 transition-colors"
            aria-label="Voltar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-sm font-medium text-slate-200">Análise de Email</h1>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/80 border border-slate-700/70 text-slate-200 hover:bg-slate-800 transition-colors"
            aria-label="Reanalisar"
          >
            <RefreshCcw className="h-4 w-4" />
          </button>
        </header>

        <main className="mt-6 flex-1 flex flex-col gap-6">
          <section>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-[0.16em]">Categoria do Email:</p>
            <div className="mt-3 inline-flex items-center rounded-2xl bg-emerald-900/50 px-4 py-2 border border-emerald-700/70">
              <span className="h-2 w-2 rounded-full bg-emerald-400 mr-2" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wide">PRODUTIVO</span>
            </div>
          </section>

          <section className="flex-1 flex flex-col">
            <div>
              <h2 className="text-base font-semibold text-slate-50">Resposta Automática Sugerida</h2>
              <p className="mt-1 text-xs text-slate-400">
                Gerada automaticamente pela IA baseada no contexto.
              </p>
            </div>

            <div className="mt-4 flex-1 flex flex-col">
              <div className="relative rounded-3xl bg-slate-900/80 border border-slate-700/80 overflow-hidden flex-1 flex flex-col">
                <div className="h-1.5 w-full bg-linear-to-r from-blue-500 to-blue-400" />
                <div className="p-5 flex-1">
                  <p className="text-sm leading-relaxed text-slate-100/90 whitespace-pre-line">
                    {`"Prezado cliente,

Agradecemos o seu contato e o interesse em nossos serviços. Informamos que sua solicitação já foi encaminhada ao nosso setor de atendimento especializado.

Um de nossos consultores entrará em contato em até 24 horas úteis para fornecer uma posição definitiva sobre o seu caso.

Atenciosamente,
Equipe de Suporte Estratégico"`}
                  </p>
                </div>

                <div className="border-t border-slate-800 px-5 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <IconCircleButton icon={Copy} label="Copiar" />
                    <IconCircleButton icon={Edit3} label="Editar" />
                  </div>
                  <PrimaryButton label="Enviar" />
                </div>
              </div>
            </div>
          </section>

          <section className="pb-4">
            <p className="text-xs tracking-[0.22em] text-slate-500 text-center mb-3">
              A CLASSIFICAÇÃO FOI ÚTIL?
            </p>
            <div className="flex items-center justify-center gap-6">
              <FeedbackButton icon={ThumbsUp} ariaLabel="Classificação útil" />
              <FeedbackButton icon={ThumbsDown} ariaLabel="Classificação não útil" />
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
}

const IconCircleButton: React.FC<IconCircleButtonProps> = ({ icon: Icon, label }) => {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1 text-[11px] text-slate-300"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-100">
        <Icon className="h-4 w-4" />
      </span>
      <span>{label}</span>
    </button>
  )
}

interface FeedbackButtonProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  ariaLabel: string
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ icon: Icon, ariaLabel }) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 text-slate-300 hover:bg-slate-800 transition-colors"
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}

