exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    './test/e2e/install.js',
    './test/e2e/user.js'
  ],
  multiCapabilities: [{
    browserName: 'chrome'
  }]
};

