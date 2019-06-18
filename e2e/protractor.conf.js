// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const { SpecReporter } = require('jasmine-spec-reporter');
const { JSONReporter } = require('jasmine-json-test-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    // chromeOptions: {args: ['--headless']}
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
  /*
  framework: 'jasmine2',
  onPrepare: function() {
    jasmine.getEnv().addReporter(new JSONReporter({
        file: 'jasmine-test-results.json',
        beautify: true,
        indentationLevel: 4 // used if beautify === true
    }));
  }
  */
};