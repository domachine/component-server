
/**
 * Module dependencies.
 */

var path = require('path')
  , fs = require('fs')
  , express = require('express')
  , cp = require('child_process')
  , blob = require('./blob')

  // symbol imports

  , join = path.join
  , exists = fs.existsSync
  , spawn = cp.spawn;

// create app

var app = module.exports = express();
app.use(express.logger('dev'));
app.use(app.router);
app.use(express.errorHandler());

/**
 * GET a blobs content.
 */

app.get('/:repo/:branch/:path([a-zA-Z0-9-./_]+)', function(req, res, next){
  var branch = req.params.branch
    , path = req.params.path
    , repo = join(app.get('root'), req.params.repo + '.git');

  // check if the repo exists otherwise git crashes

  if (!exists(repo)) return next(new Error('repo not found'));
  blob.hash(repo, branch, path, function(err, hash){
    if (err) return next(err);
    blob(repo, hash).pipe(res);
  });
});
