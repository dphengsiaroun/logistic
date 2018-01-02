const exec = require('child_process').exec;
const mysql = require('mysql');
const phpUtils = require('./phpUtils.js');
const fs = require('fs');
const cfgUtils = require('../../cfg/utils.js');
const devEnv = cfgUtils.getEnv('dev');

const user = devEnv.ws.user;
const password = devEnv.ws.password;
const hostname = devEnv.ws.host;
const port = devEnv.ws.port;
const database = devEnv.ws.database;

let contents = fs.readFileSync('gulp/sql/data.sql', 'utf8');
contents = contents.replace(/<%= url %>/g, devEnv.proxyUrl);
contents = contents.replace(/<%= database %>/g, database);
contents = phpUtils.fixSerialization(contents);
contents = `
use \`${database}\`;
` + contents;

const connection = mysql.createConnection({
    host: hostname,
    port: port,
    user: user,
    password: password,
    multipleStatements: true,
});

connection.connect();

connection.query(contents, function (error, results, fields) {
    if (error) throw error;
    connection.end();
    console.log('about to import');
});