exports.config = {
    directConnect: true,
    framework: 'jasmine2',
    baseUrl: 'http://localhost:8080',
    specs: ['specs/**-spec.js'],
    onPrepare: function() {
        browser.ignoreSynchronization = true;
        TIMEOUT = 3000
    },
    capabilities: {
        'browserName': 'chrome'
    }
}