import React from 'react'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            mobile: ''
        }
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({ [e.target.name]: e.target.value }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { firstName, lastName, mobile, email, password } = this.state
        const formData = {
            firstName,
            lastName,
            mobile,
            email,
            password
        }
        console.log(formData)
    }
    render() {
        const { firstName, lastName, mobile, email, password } = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    first Name : <input type="text" name='firstName' onChange={this.handleChange} value={firstName} /><br />
                    last Name : <input type="text" name='lastName' onChange={this.handleChange} value={lastName} /><br />
                    email : <input type="text" name='email' onChange={this.handleChange} value={email} /><br />
                    password : <input type="text" name='password' onChange={this.handleChange} value={password} /><br />
                    Confirm Password : <input type="text" onChange={this.handleChange} /><br />
                    mobile : <input type="text" name='mobile' onChange={this.handleChange} value={mobile} /><br />
                    <input type="submit" />

                </form>
            </div>
        )
    }
}

export default Register