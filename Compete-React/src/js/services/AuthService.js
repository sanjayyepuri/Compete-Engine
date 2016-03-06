var CompeteActions = require('../actions/CompeteActions');
var request = require('superagent');


module.exports = {
    authenticate : function(username, password){
        request.post('http://localhost:8080/api/authenticate')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .accept('json')
        .send({teamid: username, password: password}).end(
            function(err, res){
                console.log(res);
                var response = JSON.parse(res.text);
                if(err || !response.success){
                    console.log(res);
                }
                else {
                    var jwt = response.token;
                    CompeteActions.authenticate(jwt);
                    return true;
                }
            }
        )
    },
}