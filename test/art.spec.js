/* eslint-env node */

'use strict';

global.assert = require('assert');
var jsdom = require('jsdom').jsdom;
var document = jsdom();
var window = document.defaultView;
Object.setPrototypeOf(global, window);
require('../lib/art.js');
var TestSuite = require('./test-suite.js');
TestSuite.init();
