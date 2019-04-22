import React from 'react'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import axios from '../axios/config';
import moment from 'moment'

const styles = theme => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: "80%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.down(600 + theme.spacing.unit * 2 * 2)]: {
            width: "80%",
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
        [theme.breakpoints.down(600 + theme.spacing.unit * 3 * 2)]: {

            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 0.5,
        },
    },
    cell: {

    }
})


class AdminViewProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            isLoaded: false,
        }
    }
    componentDidMount() {
        axios.get('/products', { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
              //  console.log(response.data)
                this.setState(() => ({ products: response.data }))
            })
            .catch((err) => {
                console.log(err)
            })
    }



    handleRedirect = (id) => {
        this.props.history.push('/')
    }

    render() {
        const { classes } = this.props
        const { products } = this.state
        // console.log('isLoaded',isLoaded)
        const data = products.map(product => {
            if (product.session) {
                return {
                    key: product._id,
                    id: product._id, name: product.name,
                    category: product.category.name,
                    minPrice: product.minPrice,
                    status: product.status,
                    start: moment(product.session.date).format('DD-MM-YYYY')
                }
            } else {
                return {
                    key: product._id,
                    id: product._id, name: product.name,
                    category: product.category.name,
                    minPrice: product.minPrice,
                    status: product.status

                }
            }

        })
        return (
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>



                        <MaterialTable
                            columns={[
                                {
                                    title: 'Name', field: 'name',
                                    cellStyle: {
                                        fontSize: "14px",
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: 600
                                    }
                                },
                                {
                                    title: 'Category', field: 'category', cellStyle: {
                                        fontSize: "14px",
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: 600
                                    }
                                },
                                {
                                    title: 'Price', field: 'minPrice', type: 'numeric', cellStyle: {
                                        fontSize: "14px",
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: 600
                                    }
                                },
                                {
                                    title: 'Date', field: 'start', cellStyle: {
                                        fontSize: "14px",
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: 600
                                    }
                                },
                                {
                                    title: 'Status', field: 'status',
                                    cellStyle: data => {
                                        if (data === "Approved") {
                                            return {
                                                color: "green",
                                                fontSize: "14px",
                                                fontFamily: "'Montserrat', sans-serif",
                                                fontWeight: 600

                                            }
                                        }
                                        if (data === "Pending") {
                                            return {
                                                color: "blue",
                                                fontSize: "14px",
                                                fontFamily: "'Montserrat', sans-serif",
                                                fontWeight: 600
                                            }
                                        }
                                        if (data === "Rejected") {
                                            return {
                                                color: "red",
                                                fontSize: "14px",
                                                fontFamily: "'Montserrat', sans-serif",
                                                fontWeight: 600
                                            }
                                        }
                                    }
                                },
                            ]}
                            data={data}
                            title="Products List"
                            actions={[

                                {
                                    icon: 'info',
                                    tooltip: 'Show Product Info',
                                    onClick: (event, rowData) => {
                                        this.props.history.push(`/userProduct/${rowData.id}`)
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

AdminViewProduct.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminViewProduct);
