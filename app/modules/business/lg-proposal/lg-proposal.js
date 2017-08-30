import './lg-proposal.scss';
module.exports = 'lg-proposal';

import * as lib from './lg-proposal-route.js';
import { Proposal } from './proposal.service.js';

angular.module(module.exports, ['ui.router'])
	.service('proposal', Proposal)
	.config(lib.config)
	.component('lgProposalCreateRoute', lib.lgProposalCreateRoute)
	.component('lgProposalRetrieveRoute', lib.lgProposalRetrieveRoute)
	.component('lgProposalUpdateRoute', lib.lgProposalUpdateRoute);
