FROM python:3.11-slim

# Diretório de trabalho dentro do container
WORKDIR /app

# Configurações básicas do Python
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Instala dependências do sistema mínimas 
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copia requirements e instala dependências Python
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia código do backend para o container
COPY backend /app

# Baixa recursos do NLTK necessários (script já existe no projeto)
RUN python nltk_setup.py

# Expõe porta da API
EXPOSE 8000

# Comando padrão: roda a API FastAPI com Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

