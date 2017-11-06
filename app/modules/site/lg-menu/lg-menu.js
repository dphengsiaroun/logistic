module.exports = 'lg-menu';

import '../../technic/lg-mobile/lg-mobile.module.js';

import { lgMenu } from './lg-menu.component.js';
import { lgMenuContent } from './lg-menu-content.component.js';

const app = angular.module(module.exports, ['lg-mobile']);

app.component('lgMenu', lgMenu);
app.component('lgMenuContent', lgMenuContent);
