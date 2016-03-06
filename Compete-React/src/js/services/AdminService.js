var CompeteActions = require('../actions/CompeteActions');
var request = require('superagent');

module.exports = {
    getTeams : function(jwt){
        console.log(jwt);
        request.get('http://localhost:8080/api/admin/competitor')
        .set('x-access-token', jwt)
        .accept('json')
        .send({token : jwt})
        .end(function(err, res){
            
            if(err){
                console.log(err);
            } 
            else {
                var response = JSON.parse(res.text);
                if(!response.success){
                    console.log(response);
                 } else {
                    var data = response.data;
                    CompeteActions.getTeams(data);
                    return true;
                }
            }
        });
    }
}