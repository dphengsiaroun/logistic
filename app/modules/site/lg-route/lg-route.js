require('./css/lg-home-route.scss');
module.exports = 'lg-route';

const app = angular.module(module.exports, ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $stateProvider.state({
        name: 'home',
        url: '/',
        component: 'lgHomeRoute'
    });

    $urlRouterProvider.otherwise('/');
});

var homeUrl = require('./tmpl/home.html');

app.component('lgHomeRoute', {
    templateUrl: homeUrl,
});

app.service('context', function Context() {
    this.stack = [];
    this.push = function(n) {
        this.stack.push(n);
    };
    this.pop = function() {
        return this.stack.pop();
    };
});
