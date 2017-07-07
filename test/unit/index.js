import 'angular';
import 'angular-mocks';

const testsContext = require.context('.', true, /karma-.*\.js/);
testsContext.keys().forEach(testsContext);
