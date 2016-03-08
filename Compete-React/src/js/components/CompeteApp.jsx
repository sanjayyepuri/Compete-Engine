import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';


import Admin from '../services/AdminService';
import AdminStore from '../stores/AdminStore';
import AuthStore from '../stores/LoginStore';



function getAppState() {
    return {teams: AdminStore.getTeams()};
}

var CompeteApp = React.createClass({
    getInitialState: function(){
        return getAppState();
    },
    
    componentDidMount: function(){
        AdminStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AdminStore.removeChangeListener(this._onChange);
    },
    getTeams: function(){
      Admin.getTeams(AuthStore.getToken());
    },
    
    render: function(){
        
        var display;
        
        return (
            <div>
                <AppBar title="Compete Engine" />
            </div>
        );
    },
    
    _onChange: function(){
        this.setState(getAppState());
    }
    
});

module.exports = CompeteApp;
