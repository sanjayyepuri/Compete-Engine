import React from 'react';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import DarkTheme from 'material-ui/lib/styles/raw-Themes/dark-raw-theme';
import TeamList from './TeamList';
import CompeteApp from './CompeteApp';
 
import { Router, Route, Link, browserHistory } from 'react-router'



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
            <Router history={browserHistory}>
                 <Route path="/" component={CompeteApp}>
                    <Route path="teams" component={TeamList}/>
                    <Route path="login" component={Login}/>
                 </Route>                                 
            </Router>
        );
    }
})
