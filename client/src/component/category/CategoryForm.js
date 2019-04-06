import React from 'react'
// import axios from '../axios/config';
//import axios from "../axios/config"
// import { Link } from 'react-router-dom'
import { Button, Form, Label } from 'reactstrap'

class FormCategory extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            name: props.name ? props.name : '',
            nameError: ''
        }
    }
    handleChange = (e) => {
        const name = e.target.value
        //console.log(categoryName)
        this.setState(() => ({ name }))

    }
    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',

        }

        if (this.state.name.length < 4) {
            isError = true;
            errors.nameError = "name at least 4 character long";
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
                name: this.state.name
            }
            // console.log(formData)
            this.props.handleSubmit(formData)

        }



    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5"></div>
                        <Form onSubmit={this.handleSubmit}>
                            <Label><br />
                                Category : <br />
                                <input type="text" value={this.state.name} onChange={this.handleChange} />
                            </Label><br />
                            <p>{this.state.nameError}</p>

                            <Button type='submit' color="primary">submit</Button>
                        </Form>
                    </div>
                </div>


                {/* <Link to="/category">back</Link> */}
            </div>
        )
    }
}
export default FormCategory