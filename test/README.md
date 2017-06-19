# Logistic

Ce document pour but de vous expliquer l'utilisation de protractor sur ce projet.
Les différents tests automatisés sont les suivants :
- test de l'installation de l'application
- test de création d'une annonce transporteur ou chargeur + création d'un compte
- test de création d'un utilisateur
- test de création d'un véhicule

Tous ces tests ont été repertoriés dans le dossier `test` à la racine du projet.
Le fichier de configuration nommé `protractor.conf.js` s'y trouve également

# Installation

Tout d'abord, saisissez les commandes suivantes dans l'ordre afin d'installer le projet.

```
$ git clone https://github.com/dphengsiaroun/logistic.git
$ cd logistic
$ npm i
```
# Demarrage du projet

Démarrer le projet avec la commande suivante :
```
$ npm start
```
# Demarrage du serveur Selenium

Ouvrez un autre Shell et saisissez les commandes suivantes dans l'ordre afin de lancer le serveur Selenium.

```
$ webdriver-manager update
$ webdriver-manager start
```

# Lancement du test 

Ouvrez un autre Shell et saisissez la commande suivante :

```
$ protractor
```

Enjoy !

# Authors

- Dany PHENGSIAROUN
- Jean-Louis GUENEGO
