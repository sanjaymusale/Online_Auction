import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Input } from 'reactstrap'
import Select from 'react-select'
import axios from '../axios/config'
import { Link } from 'react-router-dom'

const styles = theme => ({

    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        minHeight: 370,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9

        height: "40px",

        width: "100%"

    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',

    },
    searchBar: {
        marginTop: '20px'
    }
});


class UserDashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            categoryData: [],
            category: '',
            product: [],
            productData: [],
            filterUser: []
        }
    }


    componentDidMount() {
        Promise.all([axios.get('/category'),
        axios.get('/products', { headers: { 'x-auth': localStorage.getItem('token') } })])

            .then((response) => {
                //const data = response.data
                //console.log(response)
                this.setState(() => ({ categoryData: response[0].data }))
                this.setState(() => ({ product: response[1].data, productData: response[1].data }))
            })
            .catch((err) => {
                console.log(err)
            })



    }

    handleChange = (e) => {
        const id = e.target.value
        //console.log('nischal', id)
        // this.setState(() => ({ category }))
        //console.log(this.state.product)

        // const id = this.state.category
        const result = this.state.product.filter(output => output.category._id === id)
        //console.log('Myrsult', result)
        this.setState(() => ({ productData: result }))

    }

    filterHandle = (e) => {
        const value = e.target.value

        const result = this.state.product.filter(output => output.name.toLowerCase().includes(value.toLowerCase()))
        //console.log(result)
        this.setState(() => ({ productData: result }))
    }

    handleSelect = (data) => {

        if (data.value === 'All') {
            this.setState(() => ({ category: data, productData: this.state.product }))
        } else {
            const filteredProduct = this.state.product.filter(p => p.category._id === data.value)
            // console.log('filteredProduct',filteredProduct)
            this.setState(() => ({ category: data, productData: filteredProduct }))
        }


    }

    render() {
        const { classes } = this.props;
        let options = this.state.categoryData.sort(function (a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1
            if (nameA > nameB)
                return 1
            return 0 //default return value (no sorting)
        }).map(function (category) {
            return { value: category._id, label: category.name };
        })
        options.unshift({ value: 'All', label: 'Show All' })
        // console.log(this.state)
        return (

            <React.Fragment>

                <main>
                    <div className={classes.searchBar}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8" >
                                    <Input type="text" onChange={this.filterHandle} placeholder="Type To Search By Name" bssize="md" />
                                    <br />
                                </div>


                                <div className="col-md-4">
                                    <Select
                                        name="category"
                                        value={this.state.category}
                                        onChange={this.handleSelect}
                                        options={options}
                                    />


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        {/* End hero unit */}
                        <Grid container spacing={40}>
                            {this.state.productData.filter(p => (p.status === 'Approved' && p.session !== undefined)).map(product => (
                                <Grid item key={product._id} sm={6} md={4} lg={3}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={product.imageUrl[0]} // eslint-disable-line max-len
                                            title={product.name}

                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {product.name}
                                            </Typography>
                                            <Typography>
                                                {product.description.slice(0, 50) + '...'}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link to={`/productmt/${product._id}`}>
                                                <Button size="small" color="primary">
                                                    Details
                                            </Button>
                                            </Link>

                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </main>
                {/* Footer */}
                {/* <footer className={classes.footer}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Footer
        </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        Something here to give the footer a purpose!
        </Typography>
                </footer> */}
                {/* End footer */}
            </React.Fragment>
        );
    }
}
UserDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserDashboard);
