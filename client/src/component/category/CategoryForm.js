import React from 'react'
import axios from '../axios/config';
//import axios from "../axios/config"
import { Link } from 'react-router-dom'

class FormCategory extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            categoryName: props.name ? props.name : ''
        }
    }
    handleChange = (e) => {
        const categoryName = e.target.value
        //console.log(categoryName)
        this.setState(() => ({ categoryName }))

    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.categoryName
        }
        console.log(formData)
        this.props.handleSubmit(formData)

        axios.post("/category", formData, { headers: { "x-auth": localStorage.getItem("token") } })
            .then(response => {
                const data = response.data
                console.log(data)
                this.setState(() => ({ categoryName: '' }))
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label><br />
                        Category : <br />
                        <input type="text" value={this.state.categoryName} onChange={this.handleChange} />
                    </label><br />
                    <input type="submit" />
                </form>
                {/* {this.props.history.push('/category')} */}
                <Link to="/category">back</Link>
            </div>
        )
    }
}
export default FormCategory