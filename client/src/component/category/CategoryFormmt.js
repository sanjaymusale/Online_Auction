import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select'
import InputAdornment from '@material-ui/core/InputAdornment';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from '../axios/config';
import FormLabel from '@material-ui/core/FormLabel';
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },

    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: "10%",

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 3,
        alignContent: 'center'
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    formlabel: {
        fontSize: '12px',
        marginTop: '5px'
    },
    textfield: {
        height: 5,
    },
    labelRoot: {
        fontSize: 15,
        marginBottom: 40
    },
    label: {
        padding: 0
    },
    container: {

        marginBottom: "10px"
    },
    input: {
        display: 'none',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },

    fileLabel: {
        fontSize: '14px',
        marginTop: '10px'
    }
});



class CategoryForm extends React.Component {
    constructor(props) {
        super(props)
        //console.log(props.imageUrl)

        this.state = {
            name: props.name ? props.name : '',

            nameError: '',


        }
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState(() => ({ [name]: value }))

    }

    handleSelect = (data) => {
        this.setState(() => ({ category: data }))
    }



    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',


        }

        if (this.state.name.length === 0) {
            isError = true;
            errors.nameError = "Provide Name ";
        }

        this.setState({
            ...this.state,
            ...errors
        })
        return isError
    }

    handleSubmit = (e) => {

        e.preventDefault()

        const err = this.validate()
        if (!err) {

            const { name } = this.state
            const formData = {
              name
            }
           // console.log(formData)
            this.props.handleSubmit(formData)
            // console.log(this.state)

        }

    }



    render() {
        const { classes } = this.props;
       // console.log(this.props)
        return (
            <React.Fragment>


                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography gutterBottom component="h5" variant="h5" align="center">
                            {this.props.title}
                        </Typography>
                        <React.Fragment>
                            <hr />
                            <React.Fragment>
                                <form className={classes.form}>
                                    <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                        <Grid item xs={2} className={classes.label} >
                                            <Typography variant="button" gutterBottom>Name</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                id="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.handleChange}
                                                fullWidth
                                                autoComplete="pname"
                                            />
                                            <FormLabel className={classes.formlabel} error={true}>{this.state.nameError}</FormLabel>
                                        </Grid>
                                    </Grid>


                                    <Grid container spacing={0} alignItems="center" justify="center">

                                        <div className={classes.buttons}>
                                        <Link to='/category'>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleBack}
                                                className={classes.button}
                                                fullWidth>
                                                Back
                                            </Button>
                                            </Link>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleSubmit}
                                                className={classes.button}
                                                fullWidth
                                            > Submit
                                            </Button>
                                        </div>
                                    </Grid>
                                </form>
                            </React.Fragment>

                        </React.Fragment>

                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

CategoryForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryForm);
