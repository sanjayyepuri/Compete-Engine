import React from 'react';
import CompeteActions from '../actions/CompeteActions';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';


var TeamList = React.createClass({
    render : function(){
        var self = this, teams = this.props.teams;
        return(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn> Team ID </TableHeaderColumn>
                        <TableHeaderColumn> School </TableHeaderColumn>
                        <TableHeaderColumn> Team Score </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.keys(teams).map(function(team){
                        return (
                            <TableRow>
                                <TableRowColumn>{teams[team].teamid}</TableRowColumn>
                                <TableRowColumn>{teams[team].school}</TableRowColumn>
                                <TableRowColumn>{teams[team].teamscore}</TableRowColumn>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        )
    }
});

module.exports = TeamList;