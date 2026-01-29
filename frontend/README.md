# Frontend – AutoU Classificador de Emails

Interface web da aplicação **AutoU**, que classifica e-mails corporativos como **produtivos** ou **improdutivos** e sugere respostas automáticas. O frontend é uma SPA (Single Page Application) construída com **React**, **TypeScript** e **Vite**.

---

## Visão geral

- O usuário envia o conteúdo do e-mail (colando texto ou fazendo upload de arquivo `.txt` ou `.pdf`).
- A aplicação envia os dados para a API do backend e exibe o resultado da classificação.
- As telas de resultado mostram a categoria (Produtivo / Improdutivo) e a resposta automática sugerida, com opção de copiar e de reanalisar.

---

## Stack

| Tecnologia | Uso |
|------------|-----|
| **React 19** | Biblioteca de UI |
| **TypeScript** | Tipagem estática |
| **Vite 7** | Build e dev server |
| **React Router 7** | Roteamento SPA |
| **Tailwind CSS 4** | Estilização |
| **Lucide React** | Ícones |

---

## Estrutura do projeto

```
frontend/
├── public/              # Arquivos estáticos públicos
├── src/
│   ├── app/             # App principal e contexto (tema)
│   ├── assets/          # Imagens e recursos
│   ├── components/      # Componentes reutilizáveis
│   │   ├── common/      # PageContainer, PrimaryButton
│   │   └── email/       # UploadCard, EmailTextInput, etc.
│   ├── pages/           # Páginas por rota
│   │   ├── home/        # Tela inicial (envio de email)
│   │   ├── result/      # Telas de resultado (produtivo, improdutivo)
│   │   └── not-found/   # 404
│   ├── index.css        # Estilos globais
│   └── main.tsx         # Entry point e rotas
├── index.html
├── package.json
├── vite.config.ts
├── nginx.conf           # Configuração Nginx (Docker)
└── Dockerfile           # Build para produção
```

---

## Requisitos

- **Node.js** >= 18
- **npm** (ou outro gerenciador compatível)

---

## Executar localmente

### 1. Instalar dependências

```bash
cd frontend
npm install
```

### 2. Comunicação com o backend

O frontend chama a API em **`/api`** (URL relativa). Assim:

- **Com Docker**: o Nginx faz proxy de `/api` para o backend; não é necessário configurar variáveis de ambiente.
- **Só Vite (npm run dev)**: o navegador resolve `/api` como `http://localhost:5173/api`, então as requisições não chegam ao backend. Configure um **proxy** no `vite.config.ts`:

```ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
```

Assim, requisições para `http://localhost:5173/api` são encaminhadas para `http://localhost:8000/api`.

### 3. Subir o servidor de desenvolvimento

```bash
npm run dev
```

O Vite sobe em **http://localhost:5173**. O backend deve estar rodando (por exemplo em `http://localhost:8000`) para as requisições funcionarem.

---

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Sobe o servidor de desenvolvimento (Vite) com hot reload |
| `npm run build` | Compila para produção (`tsc -b && vite build`) |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Executa o ESLint |

---

## Rotas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Home | Formulário para enviar texto ou arquivo do e-mail |
| `/productive` | Resultado produtivo | Exibe classificação produtiva e resposta sugerida |
| `/unproductive` | Resultado improdutivo | Exibe classificação improdutiva e resposta sugerida |
| `*` | Not Found | Página 404 |

---

## Deploy com Docker

O frontend é construído em dois estágios:

1. **Build**: imagem Node para instalar dependências e gerar o build estático (`npm run build`).
2. **Serve**: imagem Nginx Alpine que serve os arquivos em `dist/` e faz **proxy reverso** de `/api` para o backend.

Arquivos relevantes:

- `frontend/Dockerfile` – multi-stage build.
- `frontend/nginx.conf` – configuração do Nginx (proxy de `/api` para `http://backend:8000/api`).

O `docker-compose` na raiz do repositório orquestra frontend e backend. Não é necessário configurar `VITE_ROUTE_API` no build: o frontend usa `/api` e o Nginx encaminha para o backend.

---

## Documentação de referência

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
