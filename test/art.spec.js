'use strict';

require('expectations');
const jsdom = require('jsdom');
const { window } = new jsdom.JSDOM();
Object.setPrototypeOf(global, window);
require('../art');
const TestSuite = require('./test-suite');
TestSuite.init();
