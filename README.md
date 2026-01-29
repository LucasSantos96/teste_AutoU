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

## 6. Deploy em Produção (EC2 + Docker)

Esta seção explica como fazer o deploy da aplicação em uma instância **EC2 da AWS** usando **Docker Compose**.

### 6.1. Pré-requisitos

- Instância EC2 com Ubuntu (ou outra distribuição Linux)
- Acesso SSH à instância
- Chave de API do OpenRouter

### 6.2. Conectar na EC2 via SSH

```bash
ssh -i sua-chave.pem ubuntu@3.17.185.40
```

> **Nota**: Substitua `sua-chave.pem` pelo caminho da sua chave SSH e `3.17.185.40` pelo IP público da sua instância EC2.

### 6.3. Instalar Docker e Docker Compose

Na sua instância EC2, execute:

```bash
# Atualizar pacotes
sudo apt-get update

# Instalar dependências
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# Adicionar chave GPG oficial do Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Adicionar repositório do Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker Engine e Docker Compose Plugin
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Adicionar usuário ao grupo docker (para não precisar usar sudo)
sudo usermod -aG docker $USER

# Verificar instalação
docker --version
docker compose version
```

> **Importante**: Após adicionar o usuário ao grupo `docker`, você precisa fazer logout e login novamente (ou executar `newgrp docker`) para que as permissões tenham efeito.

**Links úteis:**
- [Documentação oficial de instalação do Docker](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Compose Plugin](https://docs.docker.com/compose/install/linux/)

### 6.4. Clonar o repositório na EC2

```bash
# Clonar o repositório
git clone https://github.com/LucasSantos96/teste_AutoU.git
cd teste_AutoU
```

> **Nota**: Ajuste a URL do repositório conforme necessário.

### 6.5. Configurar variáveis de ambiente

O arquivo `backend/.env` **não está no Git** (por segurança). Você precisa criá-lo manualmente na EC2:

```bash
# Criar arquivo .env a partir do template
cd backend
cp .env.example .env

# Editar o arquivo .env com sua chave real
nano .env
# ou
vim .env
```

Dentro do arquivo `.env`, coloque sua chave real do OpenRouter:

```bash
OPENROUTER_API_KEY=sk-or-v1-sua-chave-real-aqui
```

Salve o arquivo e volte para a raiz do projeto:

```bash
cd ..
```

> **Por que isso é necessário?**  
> O Docker Compose lê o arquivo `backend/.env` (definido em `docker-compose.yml`) para injetar a variável `OPENROUTER_API_KEY` no container do backend. Sem esse arquivo, a aplicação não conseguirá se comunicar com a API do OpenRouter.

### 6.6. Construir e subir os containers

```bash
# Construir as imagens Docker
docker compose build

# Subir os containers em background
docker compose up -d

# Verificar se os containers estão rodando
docker compose ps
```

Você deve ver algo como:

```
NAME                STATUS              PORTS
autou-backend       Up X seconds        0.0.0.0:8000->8000/tcp
autou-frontend      Up X seconds        0.0.0.0:80->80/tcp
```

### 6.7. Verificar logs (opcional)

Se algo não estiver funcionando, verifique os logs:

```bash
# Logs do backend
docker compose logs backend

# Logs do frontend
docker compose logs frontend

# Logs de ambos (em tempo real)
docker compose logs -f
```

### 6.8. Configurar Security Group da AWS

Para que a aplicação seja acessível pela internet, você precisa configurar o **Security Group** da sua instância EC2:

1. Acesse o **Console da AWS** → **EC2** → **Security Groups**
2. Selecione o Security Group associado à sua instância
3. Adicione uma regra de entrada (Inbound Rules):
   - **Tipo**: HTTP
   - **Porta**: 80
   - **Origem**: 0.0.0.0/0 (ou apenas IPs específicos para maior segurança)
   - **Descrição**: "Frontend HTTP"

**Links úteis:**
- [Documentação AWS sobre Security Groups](https://docs.aws.amazon.com/AEC2/latest/UserGuide/working-with-security-groups.html)
- [Como configurar Security Groups no Console AWS](https://docs.aws.amazon.com/AEC2/latest/UserGuide/security-group-rules-reference.html)

### 6.9. Acessar a aplicação

Após configurar o Security Group, acesse:

- **Frontend**: `http://3.17.185.40` (ou `http://seu-dominio.com` se tiver configurado)
- **Backend API**: `http://3.17.185.40:8000` (health check)

> **Nota**: O frontend está configurado para usar o proxy reverso do Nginx (`/api`), então não é necessário expor a porta 8000 publicamente. Você pode manter apenas a porta 80 aberta no Security Group.

### 6.10. Comandos úteis para gerenciamento

```bash
# Parar os containers
docker compose down

# Parar e remover volumes (cuidado: remove dados persistentes)
docker compose down -v

# Reiniciar os containers
docker compose restart

# Reconstruir e subir novamente (útil após mudanças no código)
docker compose up -d --build

# Ver uso de recursos
docker stats

# Entrar no container do backend (para debug)
docker compose exec backend sh

# Entrar no container do frontend
docker compose exec frontend sh
```

### 6.11. Atualizar a aplicação

Quando houver novas mudanças no código:

```bash
# Na EC2, dentro da pasta do projeto
git pull origin main  # ou sua branch principal

# Reconstruir e reiniciar
docker compose up -d --build
```

---

## 7. Arquitetura do Deploy

### Como funciona internamente:

1. **Frontend (Nginx)**:
   - Serve os arquivos estáticos do React compilados
   - Faz **proxy reverso** de requisições `/api` para o backend
   - Acessível na porta **80** (HTTP)

2. **Backend (FastAPI + Uvicorn)**:
   - API REST que processa e-mails
   - Usa recursos do NLTK (baixados durante o build)
   - Comunica-se com OpenRouter para classificação via IA
   - Exposto internamente na porta **8000** (não precisa ser público)

3. **Rede Docker**:
   - Ambos os containers estão na mesma rede interna
   - O frontend resolve o hostname `backend` automaticamente
   - Comunicação entre containers é segura e isolada

### Por que usar Docker?

- **Isolamento**: Cada serviço roda em seu próprio container
- **Portabilidade**: Funciona igual em qualquer servidor com Docker
- **Facilidade**: Um único comando (`docker compose up`) sobe toda a aplicação
- **Consistência**: Mesmo ambiente em desenvolvimento e produção

---

## 8. Links Úteis

- [Documentação Docker](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [OpenRouter API Documentation](https://openrouter.ai/docs)

---

## 9. Troubleshooting

### Problema: "env file backend/.env not found"

**Solução**: Crie o arquivo `backend/.env` na EC2 seguindo o passo **6.5**.

### Problema: "port is already allocated"

**Solução**: Outro serviço está usando a porta. Pare o serviço ou mude a porta no `docker-compose.yml`.

### Problema: Frontend não consegue se comunicar com o backend

**Solução**: 
- Verifique se ambos os containers estão rodando (`docker compose ps`)
- Verifique os logs (`docker compose logs`)
- Confirme que o `nginx.conf` está sendo copiado corretamente no Dockerfile

### Problema: Erro de permissão ao executar Docker

**Solução**: Execute `newgrp docker` ou faça logout/login após adicionar o usuário ao grupo docker.

---

