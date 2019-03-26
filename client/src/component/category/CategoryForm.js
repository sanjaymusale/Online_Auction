import React from 'react'
// import axios from '../axios/config';
//import axios from "../axios/config"
import { Link } from 'react-router-dom'

class FormCategory extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            name: props.name ? props.name : ''
        }
    }
    handleChange = (e) => {
        const name = e.target.value
        //console.log(categoryName)
        this.setState(() => ({ name }))

    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        // console.log(formData)
        this.props.handleSubmit(formData)


    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label><br />
                        Category : <br />
                        <input type="text" value={this.state.name} onChange={this.handleChange} />
                    </label><br />
                    <input type="submit" />
                </form>

                <Link to="/category">back</Link>
            </div>
        )
    }
}
export default FormCategory