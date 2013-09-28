
/**
 * Module dependencies.
 */

var express = require('express')
  , request = require('supertest')
  , server = require('..');

/**
 * Tests.
 */

describe('ComponentServer', function(){
  var app;
  before(function(){
    app = server('..');
  });
  it('should serve the test file', function(done){
    request(app)
      .get('/component-serve-repos/master/test/test-file.txt')
      .expect('Test data\n', done);
  });
});
