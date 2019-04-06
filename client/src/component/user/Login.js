import React from 'react'
import axios from '../axios/config';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../../redux/actions/users'
import { Button, Form, Label, Input, FormText } from 'reactstrap'
class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            redirectList: false,
            emailError: '',
            passwordError: ''

        }
        this.handleChange = this.handleChange.bind(this)

    }
    handleChange(e) {
        //console.log(e.target.name, e.target.value)
        e.persist()

        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    validate = () => {
        let isError = false;
        const errors = {

            emailError: '',
            passwordError: '',
        }


        if (this.state.email.indexOf("@") === -1) {
            isError = true;
            errors.emailError = "Requires valid email"
        }

        if (this.state.password.length < 5) {
            isError = true;
            errors.passwordError = "password at least 4 character long";
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
                email: this.state.email,
                password: this.state.password
            }

            console.log(formData)

            axios.post('/users/login', formData)
                .then((response) => {
                    console.log(response.data)
                    const { token } = response.data

                    localStorage.setItem('token', token)
                    this.props.dispatch(setUser(token))
                    this.setState(() => ({
                        email: '',
                        password: '',
                        redirectList: true

                    }))
                })
                .catch((err) => {
                    console.log(err)
                })

        }


    }
    render() {
        //console.log(this.props)
        if (this.state.redirectList) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5"></div>

                        <Form onSubmit={this.handleSubmit}>
                            {/* <h2>Login</h2><br /> */}
                            <br /><Label>
                                Email
                                <Input type='text' value={this.state.email} onChange={this.handleChange} name="email" />
                            </Label>
                            <FormText color="danger">{this.state.emailError}</FormText>

                            <Label>
                                Password
                                <Input type='password' value={this.state.password} onChange={this.handleChange} name="password" />
                            </Label><br />
                            <FormText color="danger">{this.state.passwordError}</FormText> <br />
                            <Button type='submit' color="primary">submit</Button>

                        </Form>

                    </div>
                </div>

            </div>
        )

    }

}
export default connect()(Login)

