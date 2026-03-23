# To Do List prête pour Vercel

Une petite application de To Do List statique, simple à importer dans Vercel.

## Déploiement sur Vercel

1. Crée un nouveau projet dans Vercel.
2. Importe ce dépôt Git.
3. Laisse la détection automatique telle quelle.
4. Clique sur **Deploy**.

Comme il s'agit d'une application statique (`index.html`, `styles.css`, `script.js`), aucune configuration supplémentaire n'est nécessaire.

## Fonctionnalités

- ajout de tâches ;
- marquage des tâches comme terminées ;
- filtres (toutes, actives, terminées) ;
- suppression d'une tâche ;
- suppression groupée des tâches terminées ;
- sauvegarde automatique dans le `localStorage` du navigateur.

## Lancer en local

Tu peux ouvrir directement `index.html` dans un navigateur, ou lancer un petit serveur statique :

```bash
python3 -m http.server 4173
```

Puis ouvre `http://localhost:4173`.
