import React from 'react';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import DarkTheme from 'material-ui/lib/styles/raw-Themes/dark-raw-theme';
import Admin from './Admin';
import CompeteApp from './CompeteApp';
import Login from './login';
 
import { Router, Route, Link, hashHistory } from 'react-router'



export default React.createClass({
    childContextTypes : {
        muiTheme : React.PropTypes.object,
    },
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(DarkTheme),
        };
    },
    render(){
        return(
            <Router history={hashHistory}>
                 <Route path="/" component={CompeteApp}>
                    <Route path="admin" component={Admin}/>
                    <Route path="login" component={Login}/>
                 </Route>                                 
            </Router>
        );
    }
})
