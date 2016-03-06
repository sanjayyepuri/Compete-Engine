var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CompeteConstants = require('../constants/CompeteConstants');
var _ = require('underscore');
var decode = require('jwt-decode');

var _jwt = null;
var _user = null;

function login(jwt){
        _jwt = jwt;
        _user = decode(jwt);
}

var LoginStore = _.extend({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit('change');
    }, 
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    getToken: function(){
        return _jwt;
    },
    getUser: function(){
        return _user;
    },
});

AppDispatcher.register(function(payload){
   var action = payload.action;
   
   switch (action.actionType) {
       case CompeteConstants.AUTHENTICATE:
           login(action.data); 
           break;
   
       default:
           break;
   } 
});
module.exports = LoginStore;