var CompeteActions = require('../actions/CompeteActions');
var request = require('superagent');
var when = require('when');
var LoginStore = require('../stores/LoginStore');
module.exports = {
    getAuth : function(username, password){
        request.post('http://localhost:8080/api/authenticate')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .accept('json')
        .send({teamid: username, password: password}).end(
            function(err, res){
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
    handleAuth: function(loginPromise){
      return loginPromise.then(function(response) {
          var jwt = response.id_token;
          CompeteActions.authenticate(jwt);
          return true;
      });
    },
    getTeams : function(){
        return request({
            url: TEAM_URL,
            method: 'GET',
            crossOrigin: true,
            headers: {
                'token' : LoginStore.getToken()
            }
        }).then(function(response){
            CompeteActions.getTeams(response);
        });
    }
}