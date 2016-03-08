import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { Router, Route, Link, hashHistory } from 'react-router';

const style = {
 
}

export default  React.createClass({
    getInitialState(){
        return {leftnav: false};
    },
    handleToggle() {
        console.log('HI')
        this.setState({leftnav: !this.state.leftnav});
    },
    render() {
        var menuItems = [
            {id: 1,route : '/admin', text: 'Admin'},
            {id: 2,route : '/login', text:'Login'}
        ];
        return (
            <div>
                <AppBar
                    onLeftIconButtonTouchTap={this.handleToggle}
                    title="Compete Engine"
                    />
                <LeftNav 
                    docked={false} 
                    open={this.state.leftnav}
                    onRequestChange={open => this.setState({leftnav:open})}
                >
                    {menuItems.map(link => 
                        <MenuItem
                            key={link.id}
                            linkButton
                            containerElement={<Link to={link.route}/>}
                            primaryText={link.text}
                        />
                            
                        
                    )}
                </LeftNav>
                <div style={style} >
                    {this.props.children}
                </div>
            </div>
        );
    },
});
