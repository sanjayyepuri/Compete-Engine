var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CompeteConstants = require('../constants/CompeteConstants');
var _ = require('underscore');

var _teams = {};

function loadTeams(data){
    _teams = data;
}

var AdminStore = _.extend({}, EventEmitter.prototype, {
   emitChange: function() {
       this.emit('change');
   } ,
   addChangeListener: function(callback) {
       this.on('change', callback);
   },
   removeChangeListener : function(callback) {
       this.removeListener('change', callback);
   }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    
    switch (action.actionType) {
        case CompeteConstants.GET_COMPETITORS:
            loadTeams(action.data);
            break;
    
        default:
            return true;
    }
    AdminStore.emitChange();
    return true;
});

module.exports = AdminStore;
