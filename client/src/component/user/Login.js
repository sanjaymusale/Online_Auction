import React from 'react'
import axios from '../axios/config';
import { Redirect } from 'react-router-dom'
import { Button, Form, Label, Input, FormText } from 'reactstrap'
class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            redirectList: false,
            emialError: '',
            password: ''

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
                    //console.log('users/login456')
                    localStorage.setItem('token', token)
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
        if (this.state.redirectList) {
            return <Redirect to="/products" />
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
export default Login


// import React from 'react'
// import { withFormik, Form, Field } from 'formik'
// import { FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap'
// import * as Yup from 'yup'
// import axios from '../axios/config'

// const LoginPage = ({
//     values,
//     errors,
//     touched
// }) => (
//         <Form>

//             <div>{touched.email && errors.email && <p>{errors.email}</p>}
//                 <Field type="email" name="email" placeholder="email" />
//             </div>

//             <div>
//                 {touched.password && errors.password && <p>{errors.password}</p>}
//                 <Field type="password" name="password" placeholder="password" />
//             </div>

//             <button>Submit</button>

//         </Form>
//     )

// const Login = withFormik({
//     mapPropsToValues({ email, password }) {
//         return {

//             email: email || '',
//             password: password || ''
//         }
//     },
//     validationSchema: Yup.object().shape({

//         email: Yup.string().email('Provide Valid Email').required('Provide Email'),
//         password: Yup.string().required('Provide password'),

//     }),
//     handleSubmit(values, { resetForm }) {
//         console.log(values)
//         axios.post('/users/login', values)
//             .then((response) => {
//                 console.log(response.data)
//                 localStorage.setItem('token', response.data.token)
//                 resetForm({
//                     email: '',
//                     password: ''
//                 })
//             })
//             .catch((err) => {
//                 console.log(err)
//             })

//     }
// })(LoginPage)


// export default Login