var supertest = require('supertest');
var should = require('should');

var server = supertest.agent("http://localhost:8080");

describe("Authentication", function(){
    it("should return invalid teamid", function(done){
        server.post('/api/authenticate')
        .send({teamid: "Team-1", password: "password"})
        .expect("Content-type", /json/)
        .expect(200)
        .end(function(err, res){
            res.body.success.should.equal(false);
            res.body.auth.should.equal("Incorrect Team ID");
            done();
        });
    });

    it("should return invalid password", function(){
        server.post('/api/authenticate')
        .send({teamid: "Team 1", password :  "asdfasdfa"})
        .expect("Content-type", /json/)
        .expect(200)
        .end(function(err, res){
            res.body.success.should.equal(false);
            res.body.auth.should.equal("Incorrect Password");
            done();
        });
    });

    it("should return authentication success", function(){
        server.post('/api/authenticate')
        .send({teamid: "Team 1", password : "password"})
        .expect("Content-type", /json/)
        .expect(200)
        .end(function(err, res){
            res.body.success.should.equal(true);
            res.body.auth.should.equal("Logged in");
            res.body.shoud.have.property('token');
            done();
        });
    });
});