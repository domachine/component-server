
/**
 * Module dependencies.
 */

var cp = require('child_process')
  , spawn = cp.spawn;

/**
 * Module exports.
 */

exports = module.exports = blob;
exports.hash = hash;

/**
 * Stream a blob.
 */

function blob(repo, hash) {
  var git = spawn('git', ['show', hash], {
    cwd: repo
  });
  return git.stdout;
}

/**
 * Extract the hash of a blob by path.
 */

function hash(repo, branch, path, fn) {
  var git
    , data = '';
  git = spawn('git', ['ls-tree', branch, path], {
    cwd: repo
  });

  // collect git's output

  git.stdout.on('data', function(d){
    data += d;
  });
  git.stdout.once('close', function(){
    data = data.split(' ');
    if (data.length <= 1) {

      // blob not found

      return (function(){
        var err = new Error('blob not found');
        err.statusCode = 404;
        fn(err);
      })();
    }

    // parse data

    if (data[1] === 'blob') fn(null, data[2].split('\t')[0]);
    else return fn(new Error('not a blob'));
  });
}
