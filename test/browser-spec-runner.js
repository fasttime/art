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

    mocha.setup({ ui: 'bdd', reporter: MochaBar });
    mocha.checkLeaks();
    TestSuite.init();
    addEventListener('load', handleLoad);
}
)();
