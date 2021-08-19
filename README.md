# REST API list de contacts formation MEANSTACK

## Comment démarrer le projet:

1. Cloner ce repository : `git clone https://github.com/jochri3/rest-api-formation-mean-stack.git`

2. Installer les dépendances : `npm install`

3. Télécharger et installer MongoDB:

   - [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)
   - [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
   - [MacOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

4. Optionnel : Installer MongoDB compass [ici](https://www.mongodb.com/products/compass) , pour gérer la base de donnée vie une GUI

5. Créer un fichier `.env` à la racine du projet, et mettez-y l'url de connexion à votre base de données:
   ```
       DATABASE_URL=mongodb://localhost:27017/contacts-manager-dev
   ```

## Démarrage de l'application

- Lancement `prod` : `>npm run prod`
- Lancement `dev` : `>npm run dev`

## Tests

`npm run test`

## API

- `GET /api/contacts` : Lister tous les contacts
- `GET /api/contacts/:id` : Récupérer un contact
- `POST /api/contacts` : Créer un contact
- `PUT /api/contacts/:id` : Mettre à jour contact
- `DELETE /api/contacts/:id` : Supprimer un contact

### Pour les méthodes `POST` et `PUT`, vous devez envoyer les données suivantes

- `name`:`string` obligatoire
- `phone`:`string` obligatoire
- `email`: `string` et `email` valide
- `status` : `string` pouvant être `active/inactive`, mais n'est pas un champ obligatoire,car il est par défaut `active`

## Event websocket

- `POST /api/contacts` : Le serveur emmet un `contact:create` avec la ressource créée
- `PUT /api/contacts/:id` : Le serveur emmet un `contact:update` avec la ressource mise à jour
- `DELETE /api/:id` : Le serveur emmet un `contact:destroy` sans données
- Au remplissage du formulaire le client emet un event `filling-form` et reçois du serveur `other-filling-form`.
- Quand l'on a terminé le remplir le formulaire, le client emet : `form-filling-stop`, et réponse le serveur emet `other-form-filling-stop`
