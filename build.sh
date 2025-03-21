#!/bin/bash

# Script de build pour le frontend

echo "Démarrage du build de l'application Todo..."

# Création des répertoires nécessaires s'ils n'existent pas
mkdir -p docroot/public/js
mkdir -p docroot/public/css

# Copie des fichiers frontend précompilés
echo "Copie des fichiers CSS et JavaScript vers les assets publics..."
cp -R frontend/src/css/* docroot/public/css/
cp -R frontend/src/js/* docroot/public/js/

echo "Build terminé avec succès !"

# Instructions pour Symfony
echo "Pour finir l'installation :"
echo "1. Accédez au répertoire docroot"
echo "2. Exécutez 'composer install'"
echo "3. Générez les clés OAuth :"
echo "   mkdir -p config/oauth"
echo "   openssl genrsa -out config/oauth/private.key 2048"
echo "   openssl rsa -in config/oauth/private.key -pubout -out config/oauth/public.key"
echo "4. Créez la base de données avec 'php bin/console doctrine:database:create'"
echo "5. Créez les tables avec 'php bin/console doctrine:schema:create'"
echo "6. Créez un client OAuth avec 'php bin/console league:oauth2-server:create-client todo_app_client secret --grant-type=client_credentials --scope=\"task:read task:write\"'"
