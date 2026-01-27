import React, { useState } from 'react'
import { PageContainer } from '../../components/common/PageContainer'
import { UploadCard } from '../../components/email/UploadCard'
import { OrDivider } from '../../components/email/OrDivider'
import { EmailTextInput } from '../../components/email/EmailTextInput'
import { PrimaryButton } from '../../components/common/PrimaryButton'
import { PrivacyNotice } from '../../components/email/PrivacyNotice'
import { useNavigate } from 'react-router'

export const HomePage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [emailText, setEmailText] = useState('')
  const navigate = useNavigate()

  const simulateEmailClassification = async (): Promise<'productive' | 'improductive'> => {
    // TODO: substituir por chamada real à API de classificação
    return await new Promise((resolve) => {
      setTimeout(() => {
        const isProductive = Math.random() > 0.5
        resolve(isProductive ? 'productive' : 'improductive')
      }, 1500)
    })
  }

  const handleProcessEmail = async () => {
    if (isProcessing) return

    // Garantir que existe algum conteúdo para processar
    if (!selectedFile && !emailText.trim()) {
      // Para um MVP, um alerta simples é suficiente; depois você pode trocar por um toast.
      alert('Envie um arquivo .txt/.pdf ou cole o texto do email antes de processar.')
      return
    }

    // Exemplo de como os dados estarão prontos para o backend:
    // const payload = { file: selectedFile, text: emailText }

    setIsProcessing(true)
    try {
      const result = await simulateEmailClassification()
      if (result === 'productive') {
        navigate('/productive')
      } else {
        navigate('/improductive')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <PageContainer>
      <div className="flex flex-col h-full max-w-md w-full mx-auto py-6 md:py-8 lg:py-10">

        <main className="mt-6 flex-1 flex flex-col">
          <section>
            <h1 className="text-3xl font-semibold text-slate-50 leading-snug md:text-4xl lg:text-4xl">
              Classificação Automática
              <br />
              de Emails
            </h1>
            <p className="mt-3 text-sm text-slate-300/80 md:text-base">
              Envie um documento ou cole o conteúdo para identificar a intenção do email usando IA.
            </p>
          </section>

          <section className="mt-8">
            <UploadCard
              onFileSelected={(file) => {
                setSelectedFile(file)
              }}
              selectedFileName={selectedFile?.name}
            />
          </section>

          <section className="mt-6">
            <OrDivider />
          </section>

          <section className="mt-6 flex-1 flex flex-col">
            <EmailTextInput value={emailText} onChange={setEmailText} />
          </section>
        </main>

        <div className="mt-6">
          <PrimaryButton
            label={isProcessing ? 'Processando...' : 'Processar Email'}
            fullWidth
            loading={isProcessing}
            onClick={handleProcessEmail}
          />
        </div>

        <div className="mt-4">
          <PrivacyNotice />
        </div>
      </div>
    </PageContainer>
  )
}

