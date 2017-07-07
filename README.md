# Logistic

This is a web project for a fret ad system.

It is written with AngularJS, Webpack, Karma, Protractor, Istanbul for the front-end.
For the back-end, PHP, MySQL and Apache are used.

# Prerequisites

1. Install XAMPP (https://www.apachefriends.org/fr/index.html). XAMPP is a PHP, MySQL, Apache stack.
2. Install Composer (https://getcomposer.org/). For info: Composer is used to install php dependancies as npm does.
3. Install Node (>8.1.0) (https://nodejs.org/en/). 


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

1. Add at the end of the **httpd.conf** file the following: `Include "conf/alias/*"`.
2. Create the **alias** directory under the XAMPP Apache conf directory. Example Windows: **C:\xampp\apache\conf\alias**.
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


## Run the config

```
$ cd logistic
$ gulp config
```

## Start the servers

1. Start the XAMPP server (both Apache and MySQL)
2. Start the express server: `npm start`

## Install the database

1. Open a web browser on `http://localhost:8000/app/install`.
2. Check the form and click on the install button.
3. The installation should be successfull, go to the website.
4. It should be working.

# Deployment to production environment

## Settings

Review the `cfg/environment.js` file and check the deployment parameters.
See the documentation directly inside the file.

```
$ cd logistic
$ gulp config
```

## Build

```
$ gulp rebuild
```


## Deployment

```
$ gulp deploy
```

### Note 

If you need to undeploy, just run `gulp undeploy`.


## Install the database

1. Open a web browser on `http://<www.your-target-site.com>/install`.
2. Check the form and click on the install button.
3. The installation should be successfull, go to the website.
4. It should be working.


# Test

Refer to the `package.json` file to see test commands.


# Authors

- Maite THOMIAS
- Dany PHENGSIAROUN
- Jean-Louis GUENEGO
