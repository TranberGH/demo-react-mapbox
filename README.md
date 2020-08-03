# Demo React et Mapbox

## Lancement sur localhost

Installer les dépendances :

```sh
npm install
```

Pour un démarrage rapide (sans build) avec webpack-dev-server, utilisez la commande ci-dessous.

Démarrage avec hot module reloading :

```sh
npm start
```

## Build

Build de production :

```sh
npm run build:prod
```

Build de développement :

```sh
npm run build:dev
```

Les fichiers de build sont dans le dossier dist.
Ces fichiers peuvent être servis avec n'importe quel serveur web (ex : http-server, apache, nginx...)

Le fichier .env (à créer au même niveau que package.json) contient le token Mapbox (MAPBOX_ACCESS_TOKEN)

Au survol, les markers affichent un popup d'infos.
Le calques des districts et les markers des stations peuvent être affichés/masqués avec les boutons de gauche.
