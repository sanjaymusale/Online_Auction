import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from '../axios/config'

const RegisterPage = ({
    values,
    errors,
    touched
}) => (
        <Form>
            <div>
                {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
                <Field type="text" name="firstName" placeholder="firstName" />
            </div>
            <div>
                {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
                <Field type="text" name="lastName" placeholder="lastName" />
            </div>
            <div>{touched.email && errors.email && <p>{errors.email}</p>}
                <Field type="email" name="email" placeholder="email" />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="password" />
            </div>
            <div>
                {touched.confirm && errors.confirm && <p>{errors.confirm}</p>}
                <Field type="password" name="confirm" placeholder="confirm" />
            </div>
            <div>
                {touched.mobile && errors.mobile && <p>{errors.mobile}</p>}
                <Field type="text" name="mobile" placeholder="mobile" />
            </div>
            <button>Submit</button>

        </Form>
    )

const Register = withFormik({
    mapPropsToValues({ firstName, lastName, mobile, confirm, email, password }) {
        return {
            firstName: firstName || '',
            lastName: lastName || '',
            email: email || '',
            password: password || '',
            mobile: mobile || '',
            confirm: confirm || ''
        }
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string().min(4, 'Minimum 4 characters').required('Provide First Name'),
        lastName: Yup.string().min(4, 'Minimum 4 characters').required('Provide Last Name'),
        email: Yup.string().email('Provide Valid Email').required('Provide Email'),
        password: Yup.string().min(6, 'Password must be 6 characters').required('Provide password'),
        confirm: Yup.string().required('Re-Enter Password').test('passwords-match', 'Passwords is not Match', function (value) {
            return this.parent.password === value;
        }),
        mobile: Yup.string().matches(/(^([9,8,7]{1})([0123456789]{1})([0-9]{8})$)/, 'Invalid Number').min(10, 'Provide Mobile Number').required('Provide Mobile Number'),

    }),
    handleSubmit(values, { resetForm }) {
        axios.post('/users/register', values)
            .then((response) => {
                console.log(response)
                resetForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    mobile: '',
                    confirm: ''
                })
            })
            .catch((err) => {
                console.log(err)
            })

    }
})(RegisterPage)


export default Register