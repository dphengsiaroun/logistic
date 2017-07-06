exports.config = {
  framework: 'jasmine',
  
  specs: [
    './test/e2e/e2e-install.js',
    // './test/e2e/e2e-geoloc-sstub.js',
    // './test/e2e/e2e-user.js',
    // './test/e2e/e2e-carrier.js',
    // './test/e2e/e2e-loader.js',
    // './test/e2e/e2e-init.js',
    // './test/e2e/e2e-truck.js',
    './test/e2e/e2e-create-ads.js'

  ],
  multiCapabilities: [{
    browserName: 'chrome'
  }]
};

