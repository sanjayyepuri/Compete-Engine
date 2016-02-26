var AppDispatcher = require('../dispatcher/AppDispatcher');
var CompeteConstants = require('../constants/CompeteConstants');

var CompeteActions = {
    getAllCompetitors: function(data) {
        AppDispatcher.handleAction({
            actionType: CompeteConstants.GET_COMPETITORS,
            data: data
        });
    },
    
}

module.exports = CompeteActions;
