import React from 'react'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import axios from '../axios/config';
import { connect } from 'react-redux'
import moment from 'moment'
import Table from './Participant'

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
        background: "#000066",
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {

            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 0.5,
        },
    },
    cell: {

    }
})


class ProductBidder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bidding: [],


        }
    }
    componentDidMount() {
        axios.get('/bidding', { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                const { data } = response
                //console.log(data)
                this.setState(() => ({ bidding: data }))
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

    handleRedirect = (id) => {
        this.props.history.push('/')
    }

    render() {
        const { classes, person } = this.props
        const { bidding } = this.state
       // console.log('product', bidding)
        const participant = []
        let sold, amount
        bidding.forEach(bid => {
            if (bid.product.seller === person.user.userId) {
                amount = ''
                if (bid.product.sold.length === 0) {
                    sold = "Item not Sold"
                } else {
                    sold = bid.product.sold[0].user.firstName + ' ' + bid.product.sold[0].user.lastName
                    amount = bid.product.sold[0].amount
                }
                const item = {
                    date: moment(bid.session.date).format('DD-MM-YYYY'),
                    name: bid.product.name,
                    participant: bid.participant,
                    sold: sold,
                    amount: amount
                }
                participant.push(item)


            }
        })
        //console.log(participant)
        return (
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>

                        <MaterialTable
                            columns={[
                                { title: 'Name', field: 'name' },
                                { title: 'Date', field: 'date' },
                                { title: 'Bid Won', field: 'sold' },
                                { title: 'Amount', field: 'amount' }
                            ]}
                            data={participant}
                            title="My Product Bidders"
                            detailPanel={[
                                {
                                    tooltip: "Show Detail",
                                    render: rowData => {
                                        return (
                                            <div
                                                style={{
                                                    fontSize: 24,
                                                    textAlign: 'center',
                                                    color: 'white',
                                                    backgroundColor: '#FDD835',
                                                }}
                                            >
                                                {rowData.participant.length === 0 ?
                                                    "No Bidder Participated in Your Bidding"
                                                    :
                                                    <Table participant={rowData.participant} />
                                                }
                                            </div>
                                        )
                                    }
                                }
                            ]
                            }
                        />

                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

ProductBidder.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        person: state.users
    }
}
export default withStyles(styles)(
    connect(mapStateToProps)(ProductBidder));
