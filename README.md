# Boutique en Ligne

Mono-repo d'une boutique en ligne de vêtements.

- **Frontend** : Vue 3 + Vite + Vue Router + TypeScript + TailWind CSS + Shadcn-Vue
- **Backend** : Node.js + Express + Prisma + TypeScript
- **Base de données** : PostgreSQL (Docker)

---

## Prérequis

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9
- [Docker](https://www.docker.com/) et Docker Compose

---

## Installation

### 1. Cloner le repo

```bash
git clone <url-du-repo>
cd boutique_en_ligne
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp backend/.env.example backend/.env
# Éditer backend/.env avec vos valeurs
# Vous pouvez valoriser JWT_SECRET avec une valeur aléatoire : openssl rand -base64 48
```

### 4. Lancer la base de données

```bash
docker-compose up -d
```

### 5. Initialiser Prisma

```bash
npm run prisma:migrate --workspace=backend
npm run prisma:seed --workspace=backend
```

---

## Développement

### Lancer le frontend

```bash
npm run dev --workspace=frontend
# Accessible sur http://localhost:5173
```

### Lancer le backend

```bash
npm run dev --workspace=backend
# Accessible sur http://localhost:3000
```

---

## Scripts disponibles (racine)

| Commande | Description |
|---|---|
| `npm install` | Installe toutes les dépendances (workspaces) |
| `npm run dev:frontend` | Lance le serveur de dev Vue |
| `npm run dev:backend` | Lance le serveur Express en mode watch |
| `npm run format` | Formate tous les fichiers avec Prettier |
| `npm run format:check` | Vérifie le formatage sans modifier |

---

## Structure du projet

```
boutique_en_ligne/
├── frontend/          # Application Vue 3
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── views/
│   │   ├── router/
│   │   └── stores/
│   └── ...
├── backend/           # API Express
│   ├── src/
│   │   ├── routes/
│   │   └── middlewares/
│   ├── prisma/
│   │   └── schema.prisma
│   └── ...
└── docker-compose.yml # PostgreSQL
```

---

## Base de données

PostgreSQL tourne dans Docker sur le port **5432**.

```
Host:     localhost
Port:     5432
Database: boutique_db
User:     boutique_user
Password: boutique_pass
```

Pour ouvrir Prisma Studio (interface graphique) :

```bash
npx prisma studio --schema=backend/prisma/schema.prisma
```
