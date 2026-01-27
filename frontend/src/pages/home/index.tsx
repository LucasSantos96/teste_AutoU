import React from 'react'
import { PageContainer } from '../../components/common/PageContainer'
import { UploadCard } from '../../components/email/UploadCard'
import { OrDivider } from '../../components/email/OrDivider'
import { EmailTextInput } from '../../components/email/EmailTextInput'
import { PrimaryButton } from '../../components/common/PrimaryButton'
import { PrivacyNotice } from '../../components/email/PrivacyNotice'

export const HomePage: React.FC = () => {
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
            <UploadCard />
          </section>

          <section className="mt-6">
            <OrDivider />
          </section>

          <section className="mt-6 flex-1 flex flex-col">
            <EmailTextInput />
          </section>
        </main>

        <div className="mt-6">
          <PrimaryButton label="Processar Email" fullWidth />
        </div>

        <div className="mt-4">
          <PrivacyNotice />
        </div>
      </div>
    </PageContainer>
  )
}

