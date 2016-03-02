import React from 'react';
import CompeteAPI from '../utils/CompeteAPI';

function getState() {
    return {
        team: 'Admin',
        password : 'password'
    };
}
var login = React.createClass({
      getInitialState: function(){
          return getState();
      }, 
      login: function(e) {
          e.preventDefault();
          CompeteAPI.getAuth(this.state.team, this.state.password);
      }, 
      render: function() {
          return (
      <div className="login jumbotron center-block">
        <h1>Login</h1>
        <form role="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" value={this.state.team} className="form-control" id="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" value={this.state.password} className="form-control" id="password" ref="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.login}>Submit</button>
      </form>
    </div>
    );
      },
      _onChange: function(){
        this.setState(getState());
    }
})

module.exports = login;