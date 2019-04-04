import React from 'react'
import axios from '../axios/config'
import { Button, Form, Label, Input, FormText } from 'reactstrap'

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

    userNameChange = (e) => {
        // console.log(e)
        const firstName = e.target.value
        //console.log(username.length)
        this.setState(() => ({ firstName }))

    }

    userLastChange = (e) => {
        // console.log(e)
        const lastName = e.target.value
        //console.log(username.length)
        this.setState(() => ({ lastName }))

    }


    emailNameChange = (e) => {
        const email = e.target.value
        this.setState(() => ({ email }))


    }

    passwordNameChange = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }))

        // console.log(this)
    }

    mobileNameChange = (e) => {
        const mobile = e.target.value
        this.setState(() => ({ mobile }))
    }

    validate = () => {
        let isError = false;
        const errors = {
            firstError: '',
            lastError: '',
            emailError: '',
            passwordError: '',
        }

        if (this.state.firstName.length < 5) {
            isError = true;
            errors.firstError = "FirstName at least 4 character long";
        }

        if (this.state.lastName.length < 5) {
            isError = true;
            errors.lastError = "LastName at least 4 character long";
        }

        if (this.state.email.indexOf("@") === -1) {
            isError = true;
            errors.emailError = "Requires valid email"
        }
        if (this.state.password.length < 5) {
            isError = true
            errors.passwordError = "password at least 4 charact long"
        }
        // if (this.state.mobile.length < 10) {
        //     isError = true
        //     errors.mobileError = "invalid number"
        // }
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
            console.log(formData)

            // }



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
        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-5"></div>
                        <br />
                        {this.state.noticeMsg && <FormText color="success"> {this.state.noticeMsg}</FormText>}
                        <Form onSubmit={this.handleSubmit}>
                            <Label><br />
                                <br />
                                <br />
                                FirstName :<br />
                                <Input type="text" value={this.state.firstName} onChange={this.userNameChange} />

                            </Label><br />
                            <FormText color="danger">{this.state.firstError}</FormText>
                            <Label>
                                LastName :<br />
                                <Input type="text" value={this.state.lastName} onChange={this.userLastChange} />

                            </Label><br />
                            <FormText color="danger">{this.state.lastError}</FormText>
                            <Label>
                                Email :<br />
                                <Input type="text" value={this.state.email} onChange={this.emailNameChange} />

                            </Label><br />
                            <FormText color="danger">{this.state.emailError}</FormText>
                            {/* another approach to bind the this keyword is setting this while calling the function*/}
                            <Label>
                                Password :<br />
                                <Input type="password" value={this.state.password} onChange={this.passwordNameChange} />

                            </Label><br />
                            <FormText color="danger">{this.state.passwordError}</FormText>
                            <Label>
                                Mobile :<br />
                                <Input type="text" value={this.state.mobile} onChange={this.mobileNameChange} />

                            </Label><br />
                            <FormText color="danger">{this.state.mobileError}</FormText>

                            <Button type='submit' color="primary">submit</Button>


                            {/* <input type="submit" value="submit" /> */}
                        </Form>
                    </div>
                </div>


            </div>
        )

    }

}
export default Register



// import React from 'react'
// import { withFormik, Form, Field } from 'formik'
// import * as Yup from 'yup'
// import axios from '../axios/config'

// const RegisterPage = ({
//     values,
//     errors,
//     touched
// }) => (
//         <Form>
//             <div>
//                 {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
//                 <Field type="text" name="firstName" placeholder="firstName" />
//             </div>
//             <div>
//                 {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
//                 <Field type="text" name="lastName" placeholder="lastName" />
//             </div>
//             <div>{touched.email && errors.email && <p>{errors.email}</p>}
//                 <Field type="email" name="email" placeholder="email" />
//             </div>
//             <div>
//                 {touched.password && errors.password && <p>{errors.password}</p>}
//                 <Field type="password" name="password" placeholder="password" />
//             </div>
//             <div>
//                 {touched.confirm && errors.confirm && <p>{errors.confirm}</p>}
//                 <Field type="password" name="confirm" placeholder="confirm" />
//             </div>
//             <div>
//                 {touched.mobile && errors.mobile && <p>{errors.mobile}</p>}
//                 <Field type="text" name="mobile" placeholder="mobile" />
//             </div>
//             <button>Submit</button>

//         </Form>
//     )

// const Register = withFormik({
//     mapPropsToValues({ firstName, lastName, mobile, confirm, email, password }) {
//         return {
//             firstName: firstName || '',
//             lastName: lastName || '',
//             email: email || '',
//             password: password || '',
//             mobile: mobile || '',
//             confirm: confirm || ''
//         }
//     },
//     validationSchema: Yup.object().shape({
//         firstName: Yup.string().min(4, 'Minimum 4 characters').required('Provide First Name'),
//         lastName: Yup.string().min(4, 'Minimum 4 characters').required('Provide Last Name'),
//         email: Yup.string().email('Provide Valid Email').required('Provide Email'),
//         password: Yup.string().min(6, 'Password must be 6 characters').required('Provide password'),
//         confirm: Yup.string().required('Re-Enter Password').test('passwords-match', 'Passwords is not Match', function (value) {
//             return this.parent.password === value;
//         }),
//         mobile: Yup.string().matches(/(^([9,8,7]{1})([0123456789]{1})([0-9]{8})$)/, 'Invalid Number').min(10, 'Provide Mobile Number').required('Provide Mobile Number'),

//     }),
//     handleSubmit(values, { resetForm }) {
//         axios.post('/users/register', values)
//             .then((response) => {
//                 console.log(response)
//                 resetForm({
//                     firstName: '',
//                     lastName: '',
//                     email: '',
//                     password: '',
//                     mobile: '',
//                     confirm: ''
//                 })
//             })
//             .catch((err) => {
//                 console.log(err)
//             })

//     }
// })(RegisterPage)


// export default Register