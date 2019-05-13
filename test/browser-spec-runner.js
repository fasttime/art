/* eslint-env browser */
/* global MochaBar, TestSuite, mocha */

'use strict';

(function ()
{
    function handleLoad()
    {
        var runner = mocha.run();
        runner.on
        (
            'fail',
            function ()
            {
                if (runner.failures === 1)
                    setFavicon('favicon-fail.ico');
            }
        );
        runner.on
        (
            'end',
            function ()
            {
                if (!runner.failures)
                    setFavicon('favicon-pass.ico');
            }
        );
    }

    function setFavicon(href)
    {
        document.querySelector('link[rel="icon"]').href = href;
    }

    // In Internet Explorer 10, Mocha will occasionally set the globals $0, $1, $2, $3 and $4 and
    // recognize them as leaked while running unit tests.
    mocha.setup({ globals: ['$0', '$1', '$2', '$3', '$4'], reporter: MochaBar, ui: 'bdd' });
    mocha.checkLeaks();
    TestSuite.init();
    addEventListener('load', handleLoad);
}
)();
