/*!
 * VLEX Vector Layout Expressions v0.2
 *
 * Copyright 2014 Stefan Keim (indus)
 * Released under the MIT license
 * https://github.com/indus/VLEX/blob/master/license.md
 *
 * Date: 2014-04-15
 */

'use strict';

var VLEX = (function (window) {

    var el, nodes, $ = {};

    // the main function of VLEX 
    var VLEX = function VLEX(element, options) {

        // remove old eventlisteners
        window.removeEventListener('resize', VLEX.onresize);
        window.removeEventListener('mousemove', VLEX.onmousemove);

        // setting the element to 'null' kills VLEX
        if (element === null) return;

        // find a proper element
        el = (typeof element == 'string' || element instanceof String) ? document.getElementById(element) : element || document.body || document;

        // no options is no option      
        options = options || {};

        // get the $
        $ = options.$ || $;

        // 'updateOnResize' is default behaviour
        if (!(options.onresize === false)) {
            window.addEventListener('resize', VLEX.onresize);
        }

        // 'updateOnMouseMove' is optional behaviour
        if (options.onmousemove) {
            window.addEventListener('mousemove', VLEX.onmousemove);
            // default values will be overitten on first mousemove-Event
            $.mX = $.mY = -99999;
        }

        // first update
        VLEX.onresize();

        // handout function for manual triggering;
        return VLEX.update;
    }

    VLEX.$ = $;

    // window.onResize handler
    VLEX.onresize = function (evt) {

        // update x,y,cX,cY in $;
        $.x = el.clientWidth || el.parentNode.clientWidth;
        $.y = el.clientHeight || el.parentNode.clientHeight;
        $.cX = $.x / 2;
        $.cY = $.y / 2;

        VLEX.update();
    }

    // window.onMousemove handler
    VLEX.onmousemove = function (evt) {

        // update mX,mY in $;
        $.mX = evt.pageX - el.parentNode.offsetLeft;
        $.mY = evt.pageY - el.parentNode.offsetTop;

        VLEX.update();
    }


    // find eval-statement and select it
    var regExp_expHead = /({.*?})/;

    // find eval-body and select it
    var regExp_expBody = /{(.*?)}/;

    // find $ variables
    var regExp_var = /\$([a-z0-9]*)/g;

    // find carriage returns
    var regExp_cr = /\r?\n|\r/g;

    // find Math properties like 'min','max','PI'
    var regExp_math = new RegExp('(' + Object.getOwnPropertyNames(Math).join('|') + ')', 'g')


    // the update function of VLEX
    VLEX.update = function ($, force) {
        var $ = $ || VLEX.$, vlexps;
        
        if (!el)
            return;

        // get all nodes with 'vlex' attribute (cached)
        nodes = (nodes && !force) ? nodes : el.querySelectorAll('[vlex]');

        for (var i = 0, l = nodes.length; i < l; i++) {
            var node = $.$ = nodes[i];

            // start of compilation subroutine (cached)
            if (!node.vlex || force) {

                // split vlexpression into property discriptions
                var attr = node.getAttribute('vlex').split(';'), key, val;

                // init a map to cache compilation
                node.vlex = {};

                for (var j = 0, m = attr.length; j < m; j++) {

                    // split key and value
                    attr[j] = attr[j].split(':');

                    if (attr[j].length > 1) {

                        // get the key
                        key = attr[j].shift().trim();
                        // get the value and undo the ':' split
                        val = attr[j].join(':')
                                // remove carriage returns
                                .replace(regExp_cr, '')
                                // make Math functions work
                                .replace(regExp_math, 'Math.$1')
                                // make $ variables work
                                .replace(regExp_var, '$.$1')
                                // remove leading and trailing whitespace
                                .trim()
                                // split into eval-statements and strings
                                .split(regExp_expHead);

                        for (var k = 0, n = val.length, expr; k < n; k++)
                            // surround eval-statements with braces and strings with quotes
                            val[k] = (expr = regExp_expBody.exec(val[k])) ? '(' + expr[1] + ')' : '"' + val[k] + '"';

                        // make them concatenate on eval
                        node.vlex[key] = val.join('+');
                    }
                }
            } // end of compilation subroutine


            // set nodes attributes to the evaluated vlexpression
            for (var attr in node.vlex)
                node.setAttribute(attr, eval(node.vlex[attr]));

        }
    }

    // handout the VLEX main function
    return VLEX;

})(window)