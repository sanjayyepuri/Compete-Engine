var AppDispatcher = require('../dispatcher/AppDispatcher');
var CompeteConstants = require('../constants/CompeteConstants');

var CompeteActions = {
    getTeams: function(data) {
        AppDispatcher.handleAction({
            actionType: CompeteConstants.GET_TEAMS,
            data: data
        });
    },
    authenticate: function(data) {
        AppDispatcher.handleAction({
            actionType: CompeteConstants.AUTHENTICATE,
            data: data
        });
    }
    
}

module.exports = CompeteActions;
