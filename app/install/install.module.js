import 'normalize.css';
import '../css/reset.scss';
import './style.scss';
import 'angular-route';

import * as lib from './install-route.js';
import { HomeCtrl } from './home-ctrl.controller.js';
import { Install } from './install.service.js';

angular.module('install', ['ngRoute'])
	.config(lib.config)
	.service('install', Install)
	.run((install) => {
		install.init();
	})
	.controller('HomeCtrl', HomeCtrl);
