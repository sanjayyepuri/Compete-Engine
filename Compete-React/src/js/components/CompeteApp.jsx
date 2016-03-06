import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';


import ThemeManager from 'material-ui/lib/styles/theme-manager';
import DarkTheme from 'material-ui/lib/styles/raw-Themes/dark-raw-theme';

import TeamList from './TeamList';
import Login from './login';

import Admin from '../services/AdminService';
import AdminStore from '../stores/AdminStore';
import AuthStore from '../stores/LoginStore';



function getAppState() {
    return {teams: AdminStore.getTeams()};
}

var CompeteApp = React.createClass({
    childContextTypes : {
        muiTheme : React.PropTypes.object,
    },
    getChildContext () {
        return {
            muiTheme : ThemeManager.getMuiTheme(DarkTheme),
        };
    },
    
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
                <TeamList teams={this.state.teams}/>
                <FlatButton label="Primary" primary={true} onClick={this.getTeams}/>
                <Login />
            </div>
        );
    },
    
    _onChange: function(){
        this.setState(getAppState());
    }
    
});

module.exports = CompeteApp;
