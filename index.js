/**
 * Copyright (c) 2016-present, lookly
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Api = require('ava/api');
const glob = require('ultra-glob');
const gutil = require('gulp-util');
const Logger = require('ava/lib/logger');
const VerboseReporter = require('ava/lib/reporters/verbose');
const options = require('./options');

function runAva(globPatterns, config = {}) {
  const reporter = new VerboseReporter();
  const api = new Api(Object.assign({}, options, config));

  reporter.api = api;

  const logger = new Logger(reporter);

  logger.start();

  api.on('test-run', runStatus => {
    reporter.api = runStatus;
    runStatus.on('test', logger.test);
    runStatus.on('error', logger.unhandledError);

    runStatus.on('stdout', logger.stdout);
    runStatus.on('stderr', logger.stderr);
  });

  return glob(globPatterns)
    .then(files => api.run(files))
    .then(runStatus => {
      logger.finish(runStatus);

      if (runStatus.failCount + runStatus.rejectionCount + runStatus.exceptionCount > 0) {
        throw new gutil.PluginError({
          message: new Error('ava detected errors'),
          plugin: 'lookly-preset-ava',
        });
      }
    });
}

module.exports = runAva;
