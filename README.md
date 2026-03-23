# To Do List prête pour Vercel

Une petite application de To Do List statique, simple à importer dans Vercel.

## Déploiement sur Vercel

1. Crée un nouveau projet dans Vercel.
2. Importe ce dépôt Git.
3. Laisse la détection automatique telle quelle.
4. Clique sur **Deploy**.

Les fichiers front sont placés dans `public/`, ce qui correspond à la structure statique recommandée pour Vercel. La configuration `vercel.json` ajoute aussi une réécriture vers `index.html` pour éviter les erreurs `404: NOT_FOUND` sur la racine ou lors d'un rafraîchissement de page.

## Fonctionnalités

- ajout de tâches ;
- marquage des tâches comme terminées ;
- filtres (toutes, actives, terminées) ;
- suppression d'une tâche ;
- suppression groupée des tâches terminées ;
- sauvegarde automatique dans le `localStorage` du navigateur.

## Lancer en local

Tu peux lancer un petit serveur statique sur le dossier `public` :

```bash
python3 -m http.server 4173 --directory public
```

Puis ouvre `http://localhost:4173`.
