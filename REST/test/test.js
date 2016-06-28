var supertest = require('supertest');
var should = require('should');

var server = supertest.agent("http://localhost:8080");

//Tests
var auth = require('./auth.test');

auth(server);