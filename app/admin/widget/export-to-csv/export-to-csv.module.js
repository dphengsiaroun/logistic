module.exports = 'export-to-csv';

import {ExportToCsv} from './export-to-csv.service.js';

const app = angular.module(module.exports, []);

app.service('exportToCsv', ExportToCsv);
