/* eslint-env node */

'use strict';

global.assert = require('assert');
var jsdom = require('jsdom').jsdom;
var document = jsdom();
var window = document.defaultView;
Object.setPrototypeOf(global, window);
require('../lib/art.js');
require('../lib/art.css.js');
require('../lib/art.on.js');
var TestSuite = require('./test-suite.js');
TestSuite.init();
