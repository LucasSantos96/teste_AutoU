import React, { useState } from "react";
import { PageContainer } from "../../components/common/PageContainer";
import { UploadCard } from "../../components/email/UploadCard";
import { OrDivider } from "../../components/email/OrDivider";
import { EmailTextInput } from "../../components/email/EmailTextInput";
import { PrimaryButton } from "../../components/common/PrimaryButton";
import { PrivacyNotice } from "../../components/email/PrivacyNotice";
import { useNavigate } from "react-router";
import { useTheme } from "../../app/ThemeContext.tsx";

export const HomePage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [emailText, setEmailText] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const ROTA_API = import.meta.env.VITE_ROUTE_API as string;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isProcessing) return;

    if (!selectedFile && !emailText.trim()) {
      alert(
        "Envie um arquivo .txt/.pdf ou cole o texto do email antes de processar.",
      );
      return;
    }

    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    if (emailText.trim()) {
      formData.append("text", emailText.trim());
    }

    setIsProcessing(true);
    try {
      const response = await fetch(ROTA_API, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erro ao processar email: ${response.status}`);
      }

      const data = await response.json();
      const result: "productive" | "unproductive" =
        data.category === "productive" ? "productive" : "unproductive";

      if (result === "productive") {
        navigate("/productive", { state: data });
      } else {
        navigate("/unproductive", { state: data });
      }
    } catch (error) {
      console.error(error);
      alert(
        "Ocorreu um erro ao processar o email. Tente novamente em instantes.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PageContainer>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full max-w-md w-full mx-auto py-6 md:py-8 lg:py-10"
      >
        <main className="mt-6 flex-1 flex flex-col">
          <section>
            <h1
              className={`text-3xl font-semibold leading-snug md:text-4xl lg:text-4xl ${
                isDark ? "text-slate-50" : "text-slate-900"
              }`}
            >
              Classificação Automática
              <br />
              de Emails
            </h1>
            <p
              className={`mt-3 text-sm md:text-base ${
                isDark ? "text-slate-300/80" : "text-slate-600"
              }`}
            >
              Envie um documento ou cole o conteúdo para identificar a intenção
              do email usando IA.
            </p>
          </section>

          <section className="mt-8">
            <UploadCard
              onFileSelected={(file) => {
                setSelectedFile(file);
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
            label={isProcessing ? "Processando..." : "Processar Email"}
            fullWidth
            loading={isProcessing}
            type="submit"
          />
        </div>

        <div className="mt-4">
          <PrivacyNotice />
        </div>
      </form>
    </PageContainer>
  );
};
