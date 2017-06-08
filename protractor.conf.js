exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    './test/e2e/e2e-install.js',
    './test/e2e/e2e-geoloc-stub.js',
    // './test/e2e/e2e-user.js',
    // './test/e2e/e2e-carrier.js',
    // './test/e2e/e2e-loader.js',
    // './test/e2e/e2e-init.js',
    // './test/e2e/e2e-truck.js',

  ],
  multiCapabilities: [{
    browserName: 'chrome'
  }]
};

