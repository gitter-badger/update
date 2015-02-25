'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var utils = require('../lib/utils');
var logger = require('../lib/logging');

module.exports = function(verb) {
  return function() {
    return through.obj(function (file, enc, cb) {
      this.push(file);
      cb();
    }, function (cb) {
      var file = new gutil.File({
        path: '.gitattributes'
      });

      file.contents = new Buffer(require('../templates/gitattributes'));
      this.push(file);
      cb();
    });
  };
};

