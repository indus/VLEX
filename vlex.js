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

        // remove old events
        window.removeEventListener('resize', VLEX.onresize);
        window.removeEventListener('mousemove', VLEX.onmousemove);

        // setting the element to 'null' kills VLEX
        if (element === null) return;

        // get a proper new element
        el = (typeof element == 'string' || element instanceof String) ? document.getElementById(element) : element || document.body || document;

        // no 'options' is no option      
        options = options || {};

        // get the $ variables map
        $ = options.$ || $;

        // 'updateOnResize' is default behaviour
        if (!(options.onresize === false)) {
            window.addEventListener('resize', VLEX.onresize);
        }

        // set x,y default values
        $.x = $.x || el.clientWidth || el.parentNode.clientWidth;
        $.y = $.y || el.clientHeight || el.parentNode.clientHeight;
        $.cX = $.x / 2;
        $.cY = $.y / 2;

        // 'updateOnMouseMove' is optional behaviour
        if (options.onmousemove) {
            window.addEventListener('mousemove', VLEX.onmousemove);
            // default values will be overitten on first mousemove-Event
            $.mX = $.mY = -99999;
        }

        // first update
        VLEX.update();

        // handout function for manual triggering;
        return VLEX.update;
    }

    VLEX.$ = $;

    // window.onResize handler
    VLEX.onresize = function (evt) {

        // update x,y,cX,cY on $;
        $.x = el.clientWidth || el.parentNode.clientWidth;
        $.y = el.clientHeight || el.parentNode.clientHeight;
        $.cX = $.x / 2;
        $.cY = $.y / 2;

        VLEX.update();
    }

    // window.onMousemove handler
    VLEX.onmousemove = function (evt) {

        // update mX,mY on $;
        $.mX = evt.pageX - el.parentNode.offsetLeft;
        $.mY = evt.pageY - el.parentNode.offsetTop;

        VLEX.update();
    }


    //find expression {} and select it
    var regExp_expHead = /({.*?})/;

    //find expression {} and select expression body
    var regExp_expBody = /{(.*?)}/;

    //find $ variables
    var regExp_var = /\$([a-z0-9]*)/g;

    // find carriage returns
    var regExp_cr = /\r?\n|\r/g;

    // find Math properties like 'min','max','floor'
    var regExp_math = new RegExp('(' + Object.getOwnPropertyNames(Math).join('|') + ')', 'g')


    // the update function of VLEX
    VLEX.update = function ($, force) {
        var $ = $ || VLEX.$, vlexps;
        
        if (!el)
            return;

        // get all nodes with 'vlex' attribute and cache them
        nodes = (nodes && !force) ? nodes : el.querySelectorAll('[vlex]');

        for (var i = 0, l = nodes.length; i < l; i++) {
            var node = $.$ = nodes[i];

            // if not done allready or if forced to: compile the 'vlex' attribute to a string that can be passed to eval
            if (!node.vlex || force) {

                // split into attribute partes
                var attr = node.getAttribute('vlex').split(';'), key, val;

                // cache the compilation at the node
                node.vlex = {};

                for (var j = 0, m = attr.length; j < m; j++) {

                    // split key and value
                    attr[j] = attr[j].split(':');

                    if (attr[j].length > 1) {

                        //get the key
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
                                // split into expression and none-expression parts
                                .split(regExp_expHead);

                        for (var k = 0, n = val.length, expr; k < n; k++)
                            // surround expression bodys with braces and none-expressions with quotes
                            val[k] = (expr = regExp_expBody.exec(val[k])) ? '(' + expr[1] + ')' : '"' + val[k] + '"';

                        // make them concatenate on eval
                        node.vlex[key] = val.join('+');
                    }
                }
            }


            for (var attr in node.vlex)
                // set ´nodes attributes to the evaluated expressions
                node.setAttribute(attr, eval(node.vlex[attr]));

        }
    }

    // handout the VLEX main function;
    return VLEX;

})(window)