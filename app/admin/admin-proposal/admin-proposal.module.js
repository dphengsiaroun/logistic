module.exports = 'admin-proposal';

import * as lib from './admin-proposal-route.js';
import { AdminProposal } from './admin-proposal.service.js';

angular.module(module.exports, ['ui.router'])
    .service('adminProposal', AdminProposal)
    .config(lib.config)
    .component('adminProposalsRoute', lib.adminProposalsRoute);
