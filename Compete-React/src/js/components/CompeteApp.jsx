import React from 'react';
import AdminStore from '../stores/AdminStore';
import AppBar from 'material-ui/lib/app-bar';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import DarkTheme from 'material-ui/lib/styles/raw-Themes/dark-raw-theme';



function getAppState() {
    return {
        teams: AdminStore.getTeams(),
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
        return (
            <AppBar title="Compete Engine" />
        );
    },
    
    _onChange: function(){
        this.setState(getAppState());
    }
    
});

module.exports = CompeteApp;
