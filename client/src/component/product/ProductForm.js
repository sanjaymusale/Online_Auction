import React from 'react'
import axios from '../axios/config';

export default
    class ProductForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: props.name ? props.name : '',
            minPrice: props.minPrice ? props.minPrice : '',
            categoryData: [],
            category: props.category ? props.category : '',
            description: props.description ? props.description : '',
            file: ''
        }
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState(() => ({ [name]: value }))

    }

    componentDidMount() {
        axios.get('/category')
            .then((response) => {
                this.setState(() => ({ categoryData: response.data }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    fileHandle = (e) => {
        // const file1 = e.target.files[0]
        // const file2 = e.target.files[1]
        // const file = []
        // file.push(file1, file2)
        // console.log('file', file)
        const file = e.target.files
        console.log(file)
        this.setState(() => ({ file }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { name, category, description, minPrice } = this.state
        const formData = new FormData()
        formData.append('name', name)
        formData.append('category', category)
        formData.append('description', description)
        formData.append('minPrice', minPrice)
        for (const file of this.state.file) {
            formData.append('image', file)
        }
        this.props.handleSubmit(formData)
    }

    render() {

        return (
            <div>
                <h2>FORM</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name : <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </label><br />
                    <label>
                        category :
                        <select name="category" onChange={this.handleChange} >
                            <option value="">Select Category</option>
                            {this.state.categoryData.map(category => {
                                return <option key={category._id} value={category._id} >{category.name}</option>
                            })}

                        </select>
                    </label><br />
                    <label>
                        Minimum Price : <input type="number" name="minPrice" value={this.state.minPrice} onChange={this.handleChange} />
                    </label><br />
                    <label>
                        Description : <textarea name="description" value={this.state.description} onChange={this.handleChange} ></textarea>
                    </label><br />
                    <label>
                        file:<input type="file" name="image" onChange={this.fileHandle} multiple />
                    </label><br />
                    <button>Submit</button>

                </form>
            </div>
        )
    }
}