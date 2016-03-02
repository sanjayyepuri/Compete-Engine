import React from 'react';
import AdminStore from '../stores/AdminStore';
import AppBar from 'material-ui/lib/app-bar';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import DarkTheme from 'material-ui/lib/styles/raw-Themes/dark-raw-theme';

import TeamList from './TeamList';
import Login from './login';


function getAppState() {
    return {
        teams: 
        [
            {
                teamid : "Team 1",
                school : "Seven Lakes",
                teamscore : 21
            },
            {
                teamid : "Team 2",
                school : "Seven Lakes",
                teamscore : 22
            },
        ]
    };
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
    
    render: function(){
        console.log(this.state.teams);
        return (
            <div>
                <AppBar title="Compete Engine" />
                <Login />
                <TeamList teams={this.state.teams}/>
            </div>
        );
    },
    
    _onChange: function(){
        this.setState(getAppState());
    }
    
});

module.exports = CompeteApp;
