import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';



class AlertDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      url: ''

    }
  }




  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push(this.state.url)
  // console.log('close',this.state)
  }

  componentWillReceiveProps(next) {
   // console.log('next', next)
    const status = next.status
    this.setState({ open: status, url: next.url })
  }
  render() {
   // console.log('alert',this.state)
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
              {this.props.title}
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