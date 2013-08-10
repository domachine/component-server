
/**
 * Module dependencies.
 */

var express = require('express')
  , request = require('supertest')
  , app = require('..');

/**
 * Tests.
 */

describe('ComponentServer', function(){
  before(function(){
    app.set('root', '..');
  });
  it('should serve the test file', function(done){
    request(app)
      .get('/component-server/master/test/test-file.txt')
      .expect('Test data\n', done);
  });
});
