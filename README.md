# Todo Travaux

Application de gestion de tâches avec Symfony et interface JavaScript.

## Structure

- **Backend/Frontend**: Application Symfony dans le dossier `docroot`
- **API**: API RESTful avec API Platform
- **Authentification**: OAuth 2.0 (Client Credentials)
- **Administration**: Interface EasyAdmin

## Fonctionnalités

- Création, lecture, mise à jour et suppression de tâches
- Interface utilisateur intuitive 
- Réordonnancement par glisser-déposer avec appui tactile d'une seconde
- Édition des tâches via l'icône crayon
- Suppression des tâches avec confirmation via popin
- Backend sécurisé avec OAuth 2.0 (Client Credentials)
- Administration via EasyAdmin

## Installation

### Prérequis

- PHP 8.1 ou supérieur
- Composer
- MySQL 8.0 ou supérieur

### Installation rapide

1. Clonez le repository
2. Exécutez le script de build : `bash build.sh`
3. Suivez les instructions affichées à la fin du script

### Configuration du serveur web

Un fichier `.htaccess` est inclus à la racine pour rediriger toutes les requêtes vers le dossier public de Symfony. Assurez-vous que votre serveur Apache a le module mod_rewrite activé et que les fichiers .htaccess sont pris en compte (AllowOverride All).

### Docker

Un fichier `docker-compose.yml` est fourni pour développer localement :

```bash
docker-compose up -d
```

L'application sera accessible à l'adresse http://localhost:8000
