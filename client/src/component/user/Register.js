import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PermIdentity from '@material-ui/icons/PermIdentityOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormLabel from '@material-ui/core/FormLabel';

import axios from '../axios/config';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 7,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: "blue",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    formlabel: {
        fontSize: '12px',
        marginTop: '5px'
    }
});

class Register extends React.Component {
   constructor() {
        super()
        this.state = {

            firstName: '',
            lastName: '',
            email: '',
            password: '',
            mobile: '',
            noticeMsg: '',
            firstError: '',
            lastError: '',
            emailError: '',
            passwordError: '',
            mobileError: ''

        }
    }

    //es6 arrow function for event handlers where you dont have bind the this keyword

    handleChange =(e)=>{
         e.persist()

        this.setState(() => ({
            [e.target.name]: e.target.value
                    }))
    }

    validate = () => {
        let isError = false;
        const errors = {
            firstError: '',
            lastError: '',
            emailError: '',
            passwordError: '',
            mobileError:''
        }
        const { firstName,lastName,email,password,mobile}=this.state
        if (firstName.length === 0) {
            isError = true;
            errors.firstError = "Provide First Name";
        }
        if (firstName.length > 0 && firstName.length < 4) {
            isError = true;
            errors.firstError = "Should be atleast 4 characters";
        }
        if (lastName.length === 0) {
            isError = true;
            errors.lastError = "Provide Last Name";
        }
        if (lastName.length > 0 && lastName.length < 4) {
            isError = true;
            errors.lastError = "Should be atleast 4 characters";
        }
        if(email.length === 0){
             isError = true;
            errors.emailError = "Provide Email Id"
        }
        if(email.length > 0 && email.indexOf("@") === -1) {
            isError = true;
            errors.emailError = "Provide valid email"
        }
        if(password.length > 0 && password.length < 6){
            isError = true
            errors.passwordError = "Should be Minimum 6 Characters"
        }
        if (password.length === 0) {
            isError = true
            errors.passwordError = "Provide Password"
        }
        if(mobile.length > 0 && mobile.length < 10){
            isError = true
            errors.mobileError = "Provide Valid Mobile Number"
        }
        if (mobile.length === 0) {
            isError = true
            errors.mobileError = "Provide Mobile Number"
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
            const formData = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                mobile: this.state.mobile


            }
            alert("form submitted")
            console.log(formData)


            axios.post('/users/register', formData)
                .then((response) => {
                    console.log(response.data)
                    this.setState(() => ({
                        noticeMsg: response.data.notice,
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        mobile: ''



                    }))
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }

    render() {
        if (this.state.redirectList) {
            return <Redirect to="/" />
        }
        const { classes } = this.props;

        return (
            <main className={classes.main}>

                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PermIdentity />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
        </Typography>
                    <form className={classes.form}>
                        <FormControl margin="dense" fullWidth>
                            <InputLabel htmlFor="firstName">First Name </InputLabel>
                            <Input id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleChange}  autoFocus />
                            <FormLabel className={classes.formlabel} error={true}>{this.state.firstError}</FormLabel>
                        </FormControl>

                        <FormControl margin="dense" fullWidth>
                            <InputLabel htmlFor="lastName">Last Name </InputLabel>
                            <Input id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleChange}  />
                            <FormLabel className={classes.formlabel} error={true}>{this.state.lastError}</FormLabel>
                        </FormControl>

                        <FormControl margin="dense" fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" value={this.state.email} onChange={this.handleChange}   />
                            <FormLabel className={classes.formlabel} error={true}>{this.state.emailError}</FormLabel>
                        </FormControl>

                        <FormControl margin="dense" fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password"  value={this.state.password} onChange={this.handleChange} />
                            <FormLabel className={classes.formlabel} margin="normal" error={true} >{this.state.passwordError}</FormLabel>
                        </FormControl>

                        <FormControl margin="dense" fullWidth>
                            <InputLabel htmlFor="mobile">Mobile</InputLabel>
                            <Input id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange}   />
                            <FormLabel className={classes.formlabel} error={true}>{this.state.mobileError}</FormLabel>
                        </FormControl>


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                        >
                            Sign Up
          </Button>
                    </form>
                </Paper>
            </main>
        )
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
    connect()(Register))
