import './css/lg-home-route.scss';
import './css/lg-terms-route.scss';
module.exports = 'lg-route';

import {LgRoute} from './lg-route.service.js';
import {LgHomeRoute} from './lg-home-route.component.js';
import {LgTermsRoute} from './lg-terms-route.component.js';
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
        $stateProvider.state({
            name: 'terms',
            url: '/terms',
            component: 'lgTermsRoute'
        });

        $urlRouterProvider.otherwise('/');
    })
    .component('lgHomeRoute', LgHomeRoute)
    .component('lgTermsRoute', LgTermsRoute)
    .service('context', Context);
