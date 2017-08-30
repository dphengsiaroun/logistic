import './css/lg-home-route.scss';
module.exports = 'lg-route';

import {LgRoute} from './lg-route.service.js';
import {LgHomeRoute} from './lg-home-route.component.js';
import {Context} from './context.service.js';

angular.module(module.exports, ['ui.router'])
    .service('lgRoute', LgRoute)
    .run((lgRoute) => {
        lgRoute.start();
    })
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(true);
        $stateProvider.state({
            name: 'home',
            url: '/',
            component: 'lgHomeRoute'
        });

        $urlRouterProvider.otherwise('/');
    })
    .component('lgHomeRoute', LgHomeRoute)
    .service('context', Context);
