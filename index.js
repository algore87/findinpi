'use strict';

var assert = require('assert')
  , chalk = require('chalk');

module.exports.grep = function (str_to_find, src_str, pidecimals = 100) {
    assert.ok((typeof str_to_find === 'string' || typeof str_to_find === 'number') && typeof src_str === 'string',
              'Usage: .grep("str or number to find", "find in str | <pi>", "[number of decimals of pi]")');

    if (src_str === 'pi') {
        var pi = require('pi');
        src_str = pi(pidecimals);
    }

    var grep_info = {};
    var found_indexes = [];

    grep_info.src_str = src_str;
    grep_info.str_to_find = str_to_find;
    // col === undefined ? col = "grey" : col = col;

    var get_indexes = function (src_str, str_to_find) {
        let index = src_str.indexOf(str_to_find);
        while (index >= 0) {
            found_indexes.push(index);
            index = src_str.indexOf(str_to_find, index + 1);
        }
        return found_indexes;
    };

    grep_info.found_indexes = get_indexes(src_str, str_to_find);

    grep_info.print = function () {
        let str = '';
        let last_index = 0;
        found_indexes.forEach(function(elem) {
            let start = last_index;
            let end = elem;
            let len = str_to_find.length;
            str += src_str.substring(start, end); // print str until you find the searched phrase
            str += chalk.inverse.bold(src_str.substr(end, len));
            last_index = end + len;
        });
        str += src_str.substring(last_index);
        console.log(str);
    };

    grep_info.analyse = function () {
        (found_indexes.length > 0) ? console.log(chalk.inverse.bold(str_to_find) + " found " + found_indexes.length + " times at index " + found_indexes + ".") :
                                     console.log(chalk.inverse.bold(str_to_find) + " not found.");
    };

    grep_info.print();
    grep_info.analyse();
    return grep_info;
};
