import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'

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
    handleSubmit(values) {
        console.log(values)
    }
})(LoginPage)


export default Login