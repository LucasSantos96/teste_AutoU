# Backend – AutoU Classificador de Emails

API REST do **AutoU**, responsável por receber o conteúdo do e-mail, pré-processar o texto (NLP), classificar como **produtivo** ou **improdutivo** e gerar uma resposta automática sugerida. Desenvolvida em **FastAPI** (Python).

---

## Visão geral

- Recebe texto ou arquivo (`.txt` ou `.pdf`) via POST.
- Aplica pré-processamento NLP (normalização, stopwords, etc.).
- Classifica com um classificador baseado em palavras-chave; se a confiança for baixa, usa IA (OpenRouter) para classificar e gerar a resposta.
- Retorna categoria, confiança, texto processado e resposta sugerida (até 300 caracteres).

---

## Stack

| Tecnologia | Uso |
|------------|-----|
| **FastAPI** | Framework da API |
| **Uvicorn** | Servidor ASGI |
| **NLTK** | Pré-processamento de texto (tokenização, stopwords, etc.) |
| **pdfplumber** | Leitura de arquivos PDF |
| **OpenAI SDK** | Cliente para OpenRouter (classificação com IA) |
| **python-dotenv** | Variáveis de ambiente |

---

## Estrutura do projeto

```
backend/
├── app/
│   ├── api/
│   │   └── routes.py      # Rota POST /api
│   ├── services/
│   │   ├── ai_classifier.py   # Classificação via OpenRouter
│   │   ├── classifier.py      # Classificador por palavras-chave
│   │   ├── file_reader.py    # Leitura de .txt e .pdf
│   │   ├── keywords.py       # Listas de palavras produtivas/improdutivas
│   │   ├── nlp_preprocess.py # Pré-processamento do texto
│   │   └── response.py       # Geração de resposta padrão por categoria
│   └── main.py            # App FastAPI, CORS, health check
├── nltk_setup.py          # Download de recursos NLTK (punkt, stopwords, etc.)
├── requirements.txt
├── .env.example           # Template de variáveis de ambiente
└── Dockerfile             # Build para produção
```

---

## Requisitos

- **Python** >= 3.10 (recomendado 3.11)
- Chave de API do **OpenRouter** (para classificação com IA quando a confiança do classificador é baixa)

---

## Executar localmente

### 1. Ambiente virtual

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Linux/macOS
# .venv\Scripts\activate    # Windows
```

### 2. Dependências

```bash
pip install -r requirements.txt
```

### 3. Recursos NLTK (primeira vez)

Os recursos (punkt, stopwords, wordnet, etc.) são baixados pelo script:

```bash
python nltk_setup.py
```

### 4. Variáveis de ambiente

Copie o exemplo e preencha com sua chave:

```bash
cp .env.example .env
# Edite .env e defina:
# OPENROUTER_API_KEY=sk-or-v1-sua-chave-aqui
```

### 5. Subir a API

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- **Health check**: http://localhost:8000/  
- **Documentação Swagger**: http://localhost:8000/docs  
- **Rota da aplicação**: POST http://localhost:8000/api  

---

## API

### Health check

- **GET /**  
  - Resposta: `{"status": "Api is running"}`  

### Processar e-mail

- **POST /api**  
  - **Content-Type**: `multipart/form-data`  
  - **Corpo** (um dos dois):  
    - `text`: string com o conteúdo do e-mail  
    - `file`: arquivo `.txt` ou `.pdf`  
  - **Resposta** (200):  
    - `processed_text`: texto após pré-processamento  
    - `category`: `"productive"` ou `"unproductive"`  
    - `confidence`: número entre 0 e 1  
    - `response_text`: resposta sugerida (até 300 caracteres)  
  - **Erros**:  
    - 400 / corpo com `error` quando não envia texto nem arquivo, ou quando o arquivo é inválido  

---

## Serviços (resumo)

| Módulo | Função |
|--------|--------|
| `nlp_preprocess` | Normalização, remoção de stopwords, tokenização (NLTK) |
| `classifier` | Classificação por palavras-chave (produtivo vs improdutivo) e score de confiança |
| `ai_classifier` | Se confiança < 0.6, classifica e gera resposta via OpenRouter (modelo configurado no código) |
| `response` | Gera resposta padrão por categoria quando não usa IA |
| `file_reader` | Lê conteúdo de arquivo `.txt` ou `.pdf` (pdfplumber para PDF) |

---

## Deploy com Docker

O `Dockerfile` do backend:

- Usa imagem `python:3.11-slim`
- Instala dependências a partir de `requirements.txt`
- Copia o código da aplicação
- Executa `nltk_setup.py` no build para baixar recursos NLTK
- Expõe a porta 8000 e roda `uvicorn app.main:app --host 0.0.0.0 --port 8000`

O `docker-compose` na raiz do repositório usa `backend/.env` (via `env_file`) para injetar `OPENROUTER_API_KEY`. É necessário criar `backend/.env` no servidor a partir de `backend/.env.example`.

---

## Documentação de referência

- [FastAPI](https://fastapi.tiangolo.com/)
- [Uvicorn](https://www.uvicorn.org/)
- [NLTK](https://www.nltk.org/)
- [OpenRouter](https://openrouter.ai/docs)
