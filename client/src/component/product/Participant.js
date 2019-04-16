import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },

  table: {
    minWidth: 300,
  },
});



function Participant(props) {
  const { classes, participant } = props;
  

  return (
    <Paper className={classes.root}>

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Bidder Name</TableCell>
            <TableCell >Bid Amount</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {participant.sort(function(a, b){
    return b.amount-a.amount
}).map(data => (

            <TableRow key={data._id}>
              <TableCell component="th" scope="row" >
                {data.user.firstName + ' '+ data.user.lastName}
              </TableCell>
              <TableCell >{ data.amount > 50 ? data.amount : "DID NOT BID" }</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

Participant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Participant);