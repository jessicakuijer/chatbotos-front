# ChatbotOS Frontend

Interface utilisateur pour ChatbotOS, un chatbot émotionnel développé avec Svelte.

## À propos

ChatbotOS est un chatbot capable d'analyser et d'adapter son ton en fonction des émotions détectées dans les messages des utilisateurs. Cette interface frontend communique avec le [backend ChatbotOS](https://github.com/jessicakuijer/chatbotos-back) qui traite les messages et retourne des réponses avec un score émotionnel.

## Fonctionnalités

- Interface de chat moderne et réactive
- Adaptation du ton en fonction des émotions détectées
- Affichage du score émotionnel des messages
- Persistance des conversations via localStorage
- Design responsive compatible mobile

## Développement

Une fois les dépendances installées avec `npm install`, démarrez le serveur de développement :

```bash
npm run dev

# ou pour ouvrir automatiquement dans le navigateur
npm run dev -- --open
```

## Configuration

Le frontend communique par défaut avec l'API backend à l'adresse `http://127.0.0.1:8000/api/chat`. Pour modifier cette URL, consultez le fichier `src/lib/stores/chatStore.js`.

## Compilation

Pour créer une version de production :

```bash
npm run build
```

Vous pouvez prévisualiser la version de production avec `npm run preview`.

## Backend

Le backend est disponible dans un dépôt séparé : [https://github.com/jessicakuijer/chatbotos-back](https://github.com/jessicakuijer/chatbotos-back)