module.exports = 'admin-settings';

import { AdminSettings } from './admin-settings.service.js';
import * as lib from './admin-settings-route.js';

angular.module(module.exports, ['ui.router'])
	.service('adminSettings', AdminSettings)
	.config(lib.config)
	.component('adminSettingsRoute', lib.adminSettingsRoute);
