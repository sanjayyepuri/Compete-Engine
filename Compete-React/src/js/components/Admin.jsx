import React from 'React';

import TeamList from './TeamList';
import FlatButton from 'material-ui/lib/flat-button'

import Admin from '../services/AdminService';
import AdminStore from '../stores/AdminStore';
import AuthStore from '../stores/LoginStore';

function getAppState(){
    return {teams: AdminStore.getTeams()};
}

export default React.createClass({
    getInitialState: function(){
        return getAppState();
    },
    componentDidMount(){
        AdminStore.addChangeListener(this._onChange);
    },
    componentWillUnmount(){
        AdminStore.removeChangeListener(this._onChange);
    },
    getTeams(){
        console.log('HEI');
        Admin.getTeams();
    },
    render(){
        return(
            <div>
                <TeamList teams={this.state.teams}/>
                <FlatButton primary={true} label="Load Teams" onClick={this.getTeams}/>
            </div>
        );
    },
    _onChange(){
        console.log(this.state.teams)
        this.setState(getAppState);
    }
    
});