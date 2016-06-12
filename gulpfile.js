/**
 * Copyright (c) 2016-present, lookly
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const ava = require('./index');
const gulp = require('gulp');
const esformatter = require('lookly-preset-esformatter');
const eslint = require('lookly-preset-eslint');

const files = [
  '__tests__/**/*.test.js',
  '*.js',
];

gulp.task('format', () => esformatter.formatGlob(files));
gulp.task('lint', () => eslint(files));
gulp.task('test', ['lint'], () => ava('__tests__/**/*.test.js'));
