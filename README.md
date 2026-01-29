## AutoU – Classificador de E‑mails com IA

Aplicação full stack para classificar e‑mails corporativos como **produtivos** ou **improdutivos** usando IA.  
O projeto é dividido em:

- **backend**: API em FastAPI que recebe o texto/arquivo, faz pré‑processamento NLP, classifica e gera uma resposta automática.
- **frontend**: SPA em React + TypeScript (Vite) que permite enviar arquivos `.txt`/`.pdf` ou colar o texto do e‑mail.

Este documento explica **como rodar tudo localmente**.

---

## 1. Requisitos

- **Git**
- **Node.js** (>= 18) e **npm**
- **Python** (>= 3.10, recomendado 3.11)
- Acesso a um provedor de IA compatível com `openai` via **OpenRouter**

---

## 2. Clonar o repositório

```bash
git clone https://github.com/LucasSantos96/teste_AutoU.git
cd teste_AutoU
```

> Ajuste o nome da pasta se o repositório tiver outro nome no Git.

---

## 3. Configuração do Backend (FastAPI)

O backend fica na pasta `backend` e expõe a API de classificação.

### 3.1. Criar e ativar ambiente virtual

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows (PowerShell/CMD)
```

### 3.2. Instalar dependências

```bash
pip install -r requirements.txt
```

### 3.3. Variáveis de ambiente do backend

O backend usa **OpenRouter** via SDK `openai`.  
Crie um arquivo `.env` dentro de `backend` com:

```bash
# backend/.env
OPENROUTER_API_KEY=SEU_TOKEN_DA_OPENROUTER_AQUI
```

> **Por que isso é necessário?**  
> O arquivo `app/services/ai_classifier.py` carrega essa variável com `python-dotenv` para autenticar na API de IA.

### 3.4. Rodar o servidor FastAPI localmente

Ainda em `backend` (e com o venv ativo):

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Isso iniciará a API em:

- `http://localhost:8000` – rota de health check (`/`)
- `http://localhost:8000/api` – rota POST usada pelo frontend para processar o e‑mail

---

## 4. Configuração do Frontend (React + Vite)

O frontend fica na pasta `frontend` e se comunica com o backend via `fetch`.

### 4.1. Instalar dependências

Em outro terminal, na raiz do projeto:

```bash
cd frontend
npm install
```

### 4.2. Configurar a URL da API

O frontend lê a rota da API da variável `VITE_ROUTE_API` (veja `src/pages/home/index.tsx`).

Crie um arquivo `.env.local` dentro de `frontend`:

```bash
# frontend/.env.local
VITE_ROUTE_API=http://localhost:8000/api
```

> **Por que isso é necessário?**  
> Isso permite apontar o frontend para o backend correto em cada ambiente (local, Docker, produção em EC2) sem mudar o código.

### 4.3. Rodar o frontend em modo desenvolvimento

Ainda em `frontend`:

```bash
npm run dev
```

Por padrão, o Vite sobe em `http://localhost:5173`.

Certifique‑se de que:

- O **backend** está rodando em `http://localhost:8000`.
- O **frontend** está rodando em `http://localhost:5173`.

O CORS já está configurado no backend (`app/main.py`) para permitir chamadas a partir de `http://localhost:5173`.

---

## 5. Fluxo de uso local

1. Inicie o **backend** (`uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`).
2. Inicie o **frontend** (`npm run dev` dentro de `frontend`).
3. Acesse `http://localhost:5173` no navegador.
4. Envie um arquivo `.txt`/`.pdf` **ou** cole o texto do e‑mail.
5. O sistema:
   - pré‑processa o texto (NLP),
   - tenta classificar com um classificador interno,
   - se a confiança for baixa, chama a IA via OpenRouter,
   - retorna a categoria (**productive/unproductive**) e uma resposta automática curta.
6. O frontend redireciona para as telas de resultado produtivo/improdutivo.

---


