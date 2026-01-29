## Estágio 1: build da aplicação React (Vite)
FROM node:20-alpine AS build

WORKDIR /app

# Copia arquivos de configuração e dependências
COPY frontend/package*.json ./
COPY frontend/tsconfig*.json ./
COPY frontend/vite.config.ts ./
COPY frontend/eslint.config.js ./
COPY frontend/index.html ./
COPY frontend/public ./public
COPY frontend/src ./src

# Instala dependências
RUN npm install

# Gera build estático da aplicação
RUN npm run build

## Estágio 2: servidor web (Nginx) para servir os arquivos estáticos
FROM nginx:alpine

# Copia configuração customizada do Nginx (com proxy reverso para o backend)
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copia arquivos estáticos do build
COPY --from=build /app/dist /usr/share/nginx/html

# Exposição da porta HTTP
EXPOSE 80

# Comando padrão do Nginx (já definido na imagem base)

