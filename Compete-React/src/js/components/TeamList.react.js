var React = require('react');
var CompeteActions = require('../actions/CompeteActions');
var 


var TeamList = React.createClass({
    getTeams: function(){
        CompeteActions.getTeams(null);
    },
    render: function(){
        return ();
    }
})