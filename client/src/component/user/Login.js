import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from '../axios/config'

const LoginPage = ({
    values,
    errors,
    touched
}) => (
        <Form>

            <div>{touched.email && errors.email && <p>{errors.email}</p>}
                <Field type="email" name="email" placeholder="email" />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="password" />
            </div>

            <button>Submit</button>

        </Form>
    )

const Login = withFormik({
    mapPropsToValues({ email, password }) {
        return {

            email: email || '',
            password: password || ''
        }
    },
    validationSchema: Yup.object().shape({

        email: Yup.string().email('Provide Valid Email').required('Provide Email'),
        password: Yup.string().required('Provide password'),

    }),
    handleSubmit(values, { resetForm }) {
        console.log(values)
        axios.post('/users/login', values)
            .then((response) => {
                console.log(response)
                resetForm({
                    email: '',
                    password: ''
                })
            })
            .catch((err) => {
                console.log(err)
            })

    }
})(LoginPage)


export default Login