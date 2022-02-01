# oKanban

## jour 3 & 4 : Mise en place API

### Archi

Mettre en place l'architecture "classique" d'une projet express :

- installer les dépendances nécessaires avec npm.
- dossier `app/controllers`.
- fichier `app/router.js`.
- point d'entrée `index.js`.

### Le Train-train Express

Mettre en place le fichier `index.js`. Oui c'est vrai, c'est un peu toujours la même chose...

Note: pensez qu'on va faire des routes POST ! (donc avec des body ...)

### Premiers controller, premières routes

En respectant au maximum les principes de l'architecture REST, et [le tableau de routes fait ensemble](./doc/routes_REST.md), implémentez tout ce que vous pouvez !

- commencez plutôt par les routes GET
- puis les POST
- puis les PATCH
- et enfin les DELETE
- ceci n'est qu'un conseil ! si vous préférez faire toutes les "/list" d'abord, libre à vous !

Pour tester toutes ces routes, il existe plusieurs solutions, mais la plus simple reste d'utiliser un petit logiciel :

- [Insomnia](https://support.insomnia.rest/article/23-installation#ubuntu)
- [POSTMAN](https://www.getpostman.com/)
- [VSC REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [curl, en ligne de commande](https://curl.se/)
- y'en a probablement d'autres...

---

## jour 2 : BDD

### De "concept" à "logique"

En se basant sur le MCD et en utilisant [les règles basiques de transformation en MLD](https://github.com/O-clock-Alumni/fiches-recap/blob/master/bdd/conception-04-mld.md), lister dans le fichier [doc/tables.md](./doc/tables.md) les tables à créer ainsi que les champs qu'elles vont contenir.

Ne pas oublier de typer chaque champ de chaque table ! [Ici, la liste des types supportés par postgresl](https://www.postgresql.org/docs/9.2/datatype.html#DATATYPE-TABLE).

### Pas de fondations, pas de palais

Commencer par créer un utilisateur et une base de données pour notre projet.

[La fiche récap est ici](https://github.com/O-clock-Alumni/fiches-recap/blob/master/bdd/confg-postgres.md).

### Fichier de Définition des Données

Une fois les tables listées, il est temps d'écrire un fichier SQL qui va contenir toutes les instructions pour créer ces tables!

Garder la [fiche récap SQL](https://github.com/O-clock-Alumni/fiches-recap/blob/master/bdd/sql.md) sous le coude est une bonne idée :wink:

Quelques règles de base :

- Un seul fichier pour créer toutes les tables !
- Toujours commencer par détruire une table "si elle existe" avant de tenter de la créer. Cela permet d'executer le fichier sans se soucier des runs précédents.
- On peut (on doit?) écrire des commentaires en SQL, `/* Comme ceci */`.

### Seeding

Le seeding est une opération qui consiste à insérer des données fictive dans la base de données afin de pouvoir tester son bon fonctionnement et mettre la logique de notre conception à l'épreuve du feu.

Dans le même fichier SQL que précédemment, après la définition des tables, écrire des instructions SQL pour insérer des données cohérentes dans toutes les tables. Ne pas oublier de remplir AUSSI les tables de liaison !!

### Run SQL, run !

Une fois le fichier complet, il est temps de l'executer. On peut se servir de la ligne de commande, ou d'un outil graphique type DBeaver, peu importe.

Rappel, pour executer un fichier SQL en ligne de commande dans PostGres : `psql -U user -f chemin/vers/fichier.sql`

### Models

Maintenant que la base de données est prête et qu'elle contient des données de test, on peut créer nos modèles Sequelize.

- Installer les packages nécessaires
- Créer les dossier habituels (`app` et `app/models`)
- Créer les modèles "façon Sequelize" (s'inspirer des projets précédents - OQuizz)
- Ne pas oublier les associations !

### Test

C'est l'heure de jouer ! Créer un fichier `test.js`, y importer les modèles, et faire quelques requêtes pour vérifier que tout fonctionne !

---

# oKanban : Atelier Conception

## Description du projet

On refait Trello !

- On souhaite créer une application de type Kanban où il est possible de créer des cartes à l'intérieur de listes.
- L'utilisateur peut créer autant de listes qu'il désire et mettre autant de cartes à l'intérieur de ces listes.
- Chaque liste dispose d'un nom.
- Chaque carte dispose d'un titre, d'une position au sein de la liste, d'une couleur (optionnelle) et d'un ou plusieurs label(s) (optionnel(s))

On se base sur ce besoin pour créer le MCD de l'application.

**Important** : Pas question d'écrire la moindre ligne de SQL ! On s'arrête à la conception aujourd'hui. La mise en place effective de la BDD, c'est pour demain.

## Étape 1 : MCD

Déssinez le MCD en utilisant l'outils de votre choix : un papier et un crayon, [draw.io](https://draw.io), [Mocodo](http://mocodo.wingi.net/) ([fiche recap](https://kourou.oclock.io/ressources/fiche-recap/mocodo/)), [Whimsical](https://whimsical.com/), etc.

N'hésitez pas à faire un tour sur la [fiche recap du MCD](https://kourou.oclock.io/ressources/fiche-recap/mcd-modele-conceptuel-de-donnees/).

## Étape 2 : User Stories

En tant que _client_, je veux _un document_ dans le but de _comprendre les fonctionnalités de mon application_.

Complètez le tableau dans le fichier [user_stories.md](./user_stories.md).
