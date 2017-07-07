# Logistic

This is a web project for a fret ad system.

It is written with AngularJS, Webpack, Karma, Protractor, Istanbul for the front-end.
For the back-end, PHP, MySQL and Apache are used.

# Installation

## Clone the project

```
$ git clone https://github.com/dphengsiaroun/logistic.git
$ cd logistic
$ npm i
```

## Install the back-end

```
$ cd logistic
$ cd app/ws
$ composer install
```

## Configure Apache (XAMPP)

1. Make sure **httpd.conf** include the following: `Include "conf/alias/*"`.
2. Make sur you have a **conf/alias** directory. Example Windows: **C:\xampp\apache\conf\alias**.
3. Insert the following file in the **conf/alias** directory: 

**conf/alias/logistic.conf**:
```
<Directory "D:/Replace/by/the/path/to/logistic">
    Options Indexes FollowSymLinks Includes ExecCGI
    AllowOverride All
    Allow from all
	Require all granted
</Directory>
Alias /logistic "D:/Replace/by/the/path/to/logistic"
```

## Create the `environment.js` file

```
$ cd logistic
$ cd cfg
$ cp environments.js.tmpl environments.js
```

Customize the newly created **environments.js** file.

You will find the value documented in the file.


# Mise en production

## Paramètrage

Créer le fichier `cfg/environment.js` à partir du fichier `cfg/environment.js.tmpl` avec vos paramètres.

TODO: Documenter le fichier `cfg/environment.js`

## Fabrication du livrable 

```
$ gulp rebuild
```
## Déploiement
```
$ gulp deploy
```

# Authors

- Dany PHENGSIAROUN
- Jean-Louis GUENEGO
