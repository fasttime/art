(function ()
{
    'use strict';
    
    /**
     * Creates a new CSS rule and adds it to the document.
     *
     * @function art.css
     *
     * @requires art.css.js
     *
     * @param {string} selector
     * The selector of the new rule.
     *
     * @param {object} ruleObj
     * A rule definition object mapping style names to their respective values.
     */
    
    art.css =
        function (selector, ruleObj)
        {
            var ruleStr = formatRule(selector, ruleObj);
            addRule(ruleStr);
        };
    
    /**
     * Creates a new CSS keyframes rule and adds it to the document.
     *
     * @function art.css.keyframes
     *
     * @requires art.css.js
     *
     * @param {string} identifier
     * The new keyframes rule identifier.
     *
     * @param {object} ruleObj
     * An object mapping selectors to rule definition objects.
     * Rule definition objects map style names to their respective values.
     */
    
    art.css.keyframes =
        function (identifier, ruleObj)
        {
            var ruleDefs = createRuleDefs(ruleObj, formatRule);
            var ruleStr = '@keyframes ' + identifier + '{' + ruleDefs.join('') + '}';
            addRule(ruleStr);
        };
    
    function addRule(ruleStr)
    {
        if (!styleSheet)
        {
            var style = art('STYLE');
            art(document.head, style);
            styleSheet = style.sheet;
        }
        styleSheet.insertRule(ruleStr, styleSheet.cssRules.length);
    }
    
    function createRuleDefs(ruleObj, callback)
    {
        var ruleDefs =
            Object.keys(ruleObj).map(
                function (ruleName)
                {
                    var ruleValue = ruleObj[ruleName];
                    var ruleDef = callback(ruleName, ruleValue);
                    return ruleDef;
                }
            );
        return ruleDefs;
    }
    
    function formatRule(selector, ruleObj)
    {
        var ruleDefs =
            createRuleDefs(
                ruleObj,
                function (ruleName, ruleValue)
                {
                    var ruleDef = ruleName + ':' + ruleValue;
                    return ruleDef;
                }
            );
        var ruleStr = selector + '{' + ruleDefs.join(';') + '}';
        return ruleStr;
    }
    
    var styleSheet;
}
)();
