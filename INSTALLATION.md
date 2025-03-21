# Guide d'installation de l'application Todo

Ce guide explique comment installer et configurer l'application Todo headless.

## Prérequis

- PHP 8.1 ou supérieur
- Composer
- MySQL 8.0 ou supérieur
- Node.js 14.x ou supérieur
- npm ou yarn

## Installation du Backend (Symfony)

1. **Cloner le projet**

```bash
git clone <repository-url>
cd todo-app/backend
```

2. **Installer les dépendances PHP**

```bash
composer install
```

3. **Configurer l'environnement**

Copiez le fichier `.env` en `.env.local` et modifiez les paramètres selon votre environnement :

```bash
cp .env .env.local
```

Éditez `.env.local` pour configurer votre base de données et les clés OAuth.

4. **Générer les clés OAuth**

```bash
mkdir -p config/oauth
openssl genrsa -out config/oauth/private.key 2048
openssl rsa -in config/oauth/private.key -pubout -out config/oauth/public.key
```

5. **Créer la base de données**

```bash
php bin/console doctrine:database:create
php bin/console doctrine:schema:create
```

6. **Créer un client OAuth**

```bash
php bin/console league:oauth2-server:create-client \
    todo_app_client \
    secret \
    --grant-type=client_credentials \
    --scope="task:read task:write"
```

7. **Démarrer le serveur Symfony**

```bash
php -S localhost:8000 -t public
```

## Installation du Frontend (JS Vanilla)

1. **Naviguer vers le dossier frontend**

```bash
cd ../frontend
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer l'URL de l'API**

Assurez-vous que le fichier `src/js/api.js` utilise la bonne URL pour l'API backend.

4. **Démarrer le serveur de développement**

```bash
npx serve src
```

## Utilisation de l'application

1. Accéder à l'application : http://localhost:3000
2. Backend API : http://localhost:8000/api
3. Administration EasyAdmin : http://localhost:8000/admin

## Fonctionnalités

### Frontend
- Ajouter des tâches
- Éditer les tâches en cliquant sur l'icône crayon
- Supprimer les tâches après confirmation
- Réordonner les tâches par glisser-déposer (appui long de 1 seconde pour activer)

### Backend
- API RESTful sécurisée avec OAuth2
- Administration via EasyAdmin
- Stockage dans MySQL

## Dépannage

### Problèmes d'authentification OAuth
- Vérifiez que les clés OAuth ont été correctement générées
- Confirmez que le client a les bons scopes (`task:read` et `task:write`)
- Vérifiez les identifiants client dans le fichier `auth.js`

### Problèmes de CORS
Si vous rencontrez des problèmes de CORS, ajoutez le bundle NelmioCorsBundle à Symfony et configurez-le pour accepter les requêtes de votre frontend :

```bash
composer require nelmio/cors-bundle
```

Puis configurez `config/packages/nelmio_cors.yaml` :

```yaml
nelmio_cors:
    defaults:
        origin_regex: true
        allow_origin: ['^http://localhost:[0-9]+']
        allow_methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE']
        allow_headers: ['Content-Type', 'Authorization']
        expose_headers: ['Link']
        max_age: 3600
    paths:
        '^/api/':
            allow_origin: ['*']
            allow_headers: ['*']
            allow_methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS']
```