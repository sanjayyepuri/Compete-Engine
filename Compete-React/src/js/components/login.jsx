import React from 'react';
import Auth from '../services/AuthService';


import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';

const styles ={
    container:{
        margin: '0 auto',
        marginTop:'15%',
        width: '25em',
    },
    button:{
        float: 'right',
        margin: '1em'
    },

}
function getState() {
    return {
        team: '',
        password : ''
    };
}
var login = React.createClass({
      getInitialState: function(){
          return getState();
      }, 
      login: function(e) {
          e.preventDefault();
          Auth.authenticate(this.state.team, this.state.password);
      },
      handleChange: function(name, e){
          var change = {};
          change[name] = e.target.value;
        this.setState(change);
      }, 
      render: function() {
          return (
              <div style={styles.container}>
                <Card>
                <CardText>
                    <h1>Login</h1>
                    <div className={'center-block'}>
                        <TextField  value={this.state.team} onChange={this.handleChange.bind(this, 'team')}  floatingLabelText={'Team ID'}/>
                        <br/>
                        <TextField type="password" errorText={''} value={this.state.password} onChange={this.handleChange.bind(this, 'password')} floatingLabelText={'Password'} />
                    </div>
                </CardText>
                <CardActions>
                    <div className={'pull-right'}>
                        <RaisedButton onClick={this.login} className={'pull-right'}primary={true} label="Login"/>
                    </div> 
                </CardActions>
                </Card>
              </div>
          );
    
      }
})

module.exports = login;