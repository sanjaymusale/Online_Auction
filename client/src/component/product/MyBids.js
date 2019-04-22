import React from 'react'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import axios from '../axios/config';
import moment from 'moment'
import { connect } from 'react-redux'

const styles = theme => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        background : "#000066",
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {

            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 0.5,
        },
    },
    cell:{

    }
})


class MyBids extends React.Component{
    constructor(props){
        super(props)
        this.state={
            myBids: [],
            isLoaded: false,
           
        }
    }
    componentDidMount() {
        axios.get(`/bidding/user`, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                const { data } = response
                //console.log(data)
                this.setState(() => ({ myBids: data,isLoaded:true }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleChange = (e) => {
        const value = e.target.value
        const result = this.state.products.filter(output => output.status === value)
        // console.log('Myrsult', result)
        this.setState(() => ({ myProduct: result }))



    }

    handleRedirect=(id)=>{
        this.props.history.push('/')
    }

    render(){
        const { classes} = this.props
        const { myBids} = this.state 
        const { person } = this.props
       // console.log('isLoaded',isLoaded)
       
        var amt 
        var status
        const data = myBids.map(bid=>{
                bid.participant.forEach(bidder =>{
                   
                    if(bidder.user._id === person.user.userId ){
                       
                        amt = bidder.amount
                    }
                })
                bid.product.sold.forEach(item=>{
                    if(item.user === person.user.userId){
                        status = "Won"
                    }else
                    {
                        status = "Lost"
                    }
                })
                return {
                id: bid.product._id,
                name : bid.product.name ,
                amount : amt,
                start : moment(bid.session.date).format('DD-MM-YYYY'),
                status : status
                }
            
            })
       // console.log(data)
        // console.log(this.props)
        return(
             <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
           
            

            <MaterialTable
  columns={[
    { title: 'Name', field: 'name', 
    cellStyle:{
        fontSize:"14px",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600
    } },
    { title: 'Amount', field: 'amount', cellStyle:{
        fontSize:"14px",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600
    } },
    { title: 'Date', field: 'start', cellStyle:{
        fontSize:"14px",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600
    } },
    { title: 'Won/Lost', field: 'status', cellStyle:{
        fontSize:"14px",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600
    } }

  ]}
  data={data}
  title="My Bids"
  actions={[
    
    {
      icon: 'info',
      tooltip: 'Show Info',
      onClick: (event, rowData) => {
       this.props.history.push(`/productmt/${rowData.id}`)
      },
      iconProps: {
        style: {
          fontSize: 30,
          color: 'green',
        },
      },
    }
  ]}
  options={{
    actionsColumnIndex: -1,
  }}

/>
            
            </Paper>
            </main>
            </React.Fragment>
            )
    }
}

MyBids.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state)=>{
    return {
        person : state.users
    }
}
export default withStyles(styles)(
    connect(mapStateToProps)(MyBids));