// module.exports = function (server) {
//     describe("Authentication", function () {
//         describe("Wrong Team ID", function () {
//             it("should return invalid teamid", function (done) {
//                 server.post('/api/authenticate')
//                     .send({ teamid: "Team-1", password: "password" })
//                     .expect("Content-type", /json/)
//                     .expect(200)
//                     .end(function (err, res) {
//                         res.body.success.should.equal(false);
//                         res.body.message.should.equal("Incorrect Team ID.");
//                         done();
//                     });
//             });
//         });
//         describe("Wrong Password", function () {
//             it("should return invalid password", function () {
//                 server.post('/api/authenticate')
//                     .send({ teamid: "Team 1", password: "asdfasdfa" })
//                     .expect("Content-type", /json/)
//                     .expect(200)
//                     .end(function (err, res) {
//                         res.body.success.should.equal(false);
//                         res.body.message.should.equal("Incorrect Password.");
//                         done();
//                     });
//             });
//         });
//         describe("Succesful Authentication", function () {
//             it("should return authentication success", function () {
//                 server.post('/api/authenticate')
//                     .send({ teamid: "Team 1", password: "password" })
//                     .expect("Content-type", /json/)
//                     .expect(200)
//                     .end(function (err, res) {
//                         res.body.success.should.equal(true);
//                         res.body.message.should.equal("Successfully Authenticated.");
//                         res.body.should.have.property('data');
//                         done();
//                     });
//             });
//         });
//     });
// }