exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    './test/e2e/e2e-install.js',
    './test/e2e/e2e-user.js',
    './test/e2e/e2e-carrier.js'
  ],
  multiCapabilities: [{
    browserName: 'chrome'
  }]
};

