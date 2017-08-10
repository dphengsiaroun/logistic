module.exports = 'lg-menu';

import { lgMenu } from './lg-menu.component.js';
import { lgMenuContent } from './lg-menu-content.component.js';

const app = angular.module(module.exports, []);

app.component('lgMenu', lgMenu);
app.component('lgMenuContent', lgMenuContent);
