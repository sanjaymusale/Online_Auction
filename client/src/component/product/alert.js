import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class AlertDialog extends React.Component {
  constructor(props){
    super(props)
      this.state = {
          open: false

    }
  }
  

  

  handleClose = () => {
    this.setState({ open: false });
    
  }

  componentWillReceiveProps(next){
    console.log('next',next)
    const status = next.status
    this.setState({ open : status})
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Product Submitted Successfully, Admin will Review Your Product, Once it is Approved U can Participate in Bidding Process
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;