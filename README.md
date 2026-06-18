# GitHub Dashboard - Full Stack (React + Express + PostgreSQL)

## Sobre o Projeto
Aplicação Full Stack para buscar repositórios no GitHub, mostrar estatísticas e exibir um dashboard. Implementa autenticação JWT, Clean Architecture simplificada e Repository Pattern.

## Arquitetura
Backend organizado em camadas: `domain`, `application`, `infrastructure`, `presentation` conforme especificado.

## Tecnologias
- Frontend: React, Vite, Material UI, Recharts, Axios
- Backend: Node.js, Express, pg, JWT, bcrypt
- Banco: PostgreSQL (docker-compose)
- Infra: Docker Compose

## Estrutura de Pastas
- backend/: código do servidor
  - src/
    - domain/
    - application/
    - infrastructure/
    - presentation/
- frontend/: React app (Vite)

## Como Executar

### Banco
Inicie o Postgres:

```bash
docker compose up -d
```

Se Docker não estiver disponível, use um PostgreSQL local e ajuste `backend/.env`:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=github_dashboard
DB_USER=postgres
DB_PASSWORD=
DB_SOCKET=/var/run/postgresql
```

Importe a migration (opcional) ou a tabela será criada manualmente executando o SQL em `backend/src/infrastructure/database/migrations/001_init.sql`.

### Iniciar localmente

No backend:

```bash
cd backend
npm install
npm start
```

Em desenvolvimento use:

```bash
npm run dev
```

No frontend (em outro terminal):

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/github/search?q={termo}

## Fluxo
Cadastro -> Login -> Dashboard -> Pesquisar GitHub

## Melhorias Futuras
- Paginação de resultados GitHub
- Caching com Redis
- Testes automatizados
- Deploy com CI/CD
