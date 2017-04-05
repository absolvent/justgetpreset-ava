/**
 * Copyright (c) 2016-present, lookly
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
const babelPreset = require('lookly-preset-babel');
const os = require('os');

module.exports = {
  babelConfig: babelPreset(),
  cacheEnabled: true,
  concurrency: os.cpus().length,
  explicitTitles: true,
  failFast: true,
  match: [],
  serial: false,
  source: [],
  require: [require.resolve('babel-register-es6-react'), require.resolve('babel-polyfill')],
};
