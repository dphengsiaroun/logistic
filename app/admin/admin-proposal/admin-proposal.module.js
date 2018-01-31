module.exports = 'admin-proposal';

import * as lib from './admin-proposal-route.js';
import { AdminProposal } from './admin-proposal.service.js';
import '../widget/export-to-csv/export-to-csv.module.js';

angular.module(module.exports, ['ui.router', 'export-to-csv'])
    .service('adminProposal', AdminProposal)
    .config(lib.config)
    .component('adminProposalsRoute', lib.adminProposalsRoute);
