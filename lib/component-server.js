
/**
 * Module dependencies.
 */

var path = require('path')
  , fs = require('fs')
  , express = require('express')
  , cp = require('child_process')
  , git = require('git-object')

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
    , repo = join(app.get('root'), req.params.repo);

  // check if the repo exists otherwise git crashes

  if (!exists(repo)) {
    if (!exists(repo + '.git')) {
      return next(new Error('repo not found'));
    } else {
      repo += '.git';
    }
  }
  git(repo, branch, path, function(err, object){
    if (err) return next(err);
    if (object.isBlob()) {
      object.createReadStream().pipe(res);
    } else {
      next(new Error('not a blob'));
    }
  });
});
