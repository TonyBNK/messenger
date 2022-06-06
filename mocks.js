const jsdom = require('jsdom');

const {JSDOM} = jsdom;

const dom = new JSDOM('<div id="app"></div>', {url: 'http://localhost'});

global.window = dom.window;
global.document = dom.window.document;
