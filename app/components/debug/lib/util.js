"use strict";

var _ = {};

/* ------------------------------ escape ------------------------------ */

export var escape = _.escape = (function (exports) {
    /* Escapes a string for insertion into HTML, replacing &, <, >, ", `, and ' characters.
     *
     * |Name  |Type  |Desc            |
     * |------|------|----------------|
     * |str   |string|String to escape|
     * |return|string|Escaped string  |
     */

    /* example
     * escape('You & Me'); // -> 'You &amp; Me'
     */

    /* typescript
     * export declare function escape(str: string): string;
     */

    /* dependencies
     * keys
     */

    exports = function(str) {
        return regTest.test(str) ? str.replace(regReplace, replaceFn) : str;
    };

    var map = (exports.map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    });
    var regSrc = '(?:' + Object.keys(map).join('|') + ')';
    var regTest = new RegExp(regSrc);
    var regReplace = new RegExp(regSrc, 'g');

    function replaceFn(match) {
        return map[match];
    }

    return exports;
})({});


/* ------------------------------ escapeJsStr ------------------------------ */

export var escapeJsStr = _.escapeJsStr = (function (exports) {
    /* Escape string to be a valid JavaScript string literal between quotes.
     *
     * http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4
     *
     * |Name  |Type  |Desc            |
     * |------|------|----------------|
     * |str   |string|String to escape|
     * |return|string|Escaped string  |
     */

    /* example
     * escapeJsStr('\"\n'); // -> '\\"\\\\n'
     */

    /* typescript
     * export declare function escapeJsStr(str: string): string;
     */

    /* dependencies
     * toStr
     */

    exports = function(str) {
        return (str+'').replace(regEscapeChars, function(char) {
            switch (char) {
                case '"':
                case "'":
                case '\\':
                    return '\\' + char;

                case '\n':
                    return '\\n';

                case '\r':
                    return '\\r';
                // Line separator

                case '\u2028':
                    return '\\u2028';
                // Paragraph separator

                case '\u2029':
                    return '\\u2029';
            }
        });
    };

    var regEscapeChars = /["'\\\n\r\u2028\u2029]/g;

    return exports;
})({});

/* ------------------------------ escapeJsonStr ------------------------------ */

export var escapeJsonStr = _.escapeJsonStr = (function (exports) {
    /* Escape json string.
     */

    /* dependencies
     * escapeJsStr
     */

    exports = function (str) {
      return escapeJsStr(str)
        .replace(/\\'/g, "'")
        .replace(/\t/g, '\\t')
    }

    return exports;
})({});


/* ------------------------------ upperFirst ------------------------------ */

export var upperFirst = _.upperFirst = (function (exports) {
    /* Convert the first character of string to upper case.
     *
     * |Name  |Type  |Desc             |
     * |------|------|-----------------|
     * |str   |string|String to convert|
     * |return|string|Converted string |
     */

    /* example
     * upperFirst('red'); // -> Red
     */

    /* typescript
     * export declare function upperFirst(str: string): string;
     */
    exports = function(str) {
        if (str.length < 1) return str;
        return str[0].toUpperCase() + str.slice(1);
    };

    return exports;
})({});

/* ------------------------------ getObjType ------------------------------ */

export var getObjType = _.getObjType = (function (exports) {
    /* Get object type.
     */

    /* dependencies
     * upperFirst
     */

    exports = function (obj) {
      if (obj.constructor && obj.constructor.name) return obj.constructor.name

      return upperFirst({}.toString.call(obj).replace(/(\[object )|]/g, ''))
    }

    return exports;
})({});