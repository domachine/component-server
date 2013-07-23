
/**
 * Module exports.
 */

var app = module.exports = require('./lib/component-server');

// setup the project root.  this is the job of the caller.  per
// default this is the projects directory

app.set('root', __dirname);
