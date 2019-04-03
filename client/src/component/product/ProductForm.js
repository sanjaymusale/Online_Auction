import React from 'react'
import axios from '../axios/config';
import { Button, Form, Label, Input, FormText } from 'reactstrap'

export default
    class ProductForm extends React.Component {
    constructor(props) {
        super(props)
        //console.log(props.imageUrl)

        this.state = {
            name: props.name ? props.name : '',
            minPrice: props.minPrice ? props.minPrice : '',
            categoryData: [],
            SessionsData: [],
            category: props.category ? props.category : '',
            description: props.description ? props.description : '',
            file: '',

            nameError: '',
            minPriceError: '',
            descriptionError: '',

            filterSession: [],
            start: '',
            date: ''

        }
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState(() => ({ [name]: value }))

    }
    handleStart = (e) => {
        const start = e.target.value
        this.setState(() => ({ start }))
        // console.log('latest', EndTime)

    }

    componentDidMount() {
        Promise.all([
            axios.get('/category', { headers: { 'x-auth': localStorage.getItem('token') } }),
            axios.get('/sessions', { headers: { 'x-auth': localStorage.getItem('token') } })
        ])
            .then((response) => {
                console.log(response)
                this.setState(() => ({
                    categoryData: response[0].data,
                    SessionsData: response[1].data
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    fileHandle = (e) => {

        const file = e.target.files
        console.log(file)
        this.setState(() => ({ file }))
    }
    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',
            minPriceError: '',
            descriptionError: ''

        }

        if (this.state.name.length < 4) {
            isError = true;
            errors.nameError = "name at least 4 character long";
        }
        if (this.state.minPrice < 50) {
            isError = true;
            errors.minPriceError = "price should be more than 50"
        }
        if (this.state.description.length < 10) {
            errors.descriptionError = "description should be more than 10 long"
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

            const { name, category, description, minPrice, date, start } = this.state
            const formData = new FormData()
            formData.append('name', name)
            formData.append('category', category)
            formData.append('description', description)
            formData.append('minPrice', minPrice)
            formData.append('isAlloted', true)
            formData.append('date', date)
            formData.append('startSession', start)
            for (const file of this.state.file) {
                formData.append('image', file)
            }
            console.log(formData)
            this.props.handleSubmit(formData)
            // console.log(this.state)

        }

    }

    dateHandle = (e) => {
        const date = e.target.value
        const filterSession = this.state.SessionsData.filter(session => {
            return (session.date === date && session.isAlloted === false)
        })
        console.log(filterSession)
        this.setState(() => ({ filterSession, date }))

    }

    render() {
        console.log(this.props.imageUrl)
        const uniqueSessions = [...new Set(this.state.SessionsData.map(item => item.date))];
        //console.log('uniqueSession', uniqueSessions)
        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-5"></div>

                        <Form onSubmit={this.handleSubmit}>
                            <Label>
                                Name :<br />
                                <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                            </Label><br />
                            <p>{this.state.nameError}</p>


                            <select name="category" onChange={this.handleChange} >
                                <option value="">Select Category</option>
                                {this.state.categoryData.map(category => {
                                    return <option key={category._id} value={category._id} >{category.name}</option>
                                })}

                            </select><br />


                            <Label>
                                Minimum Price :<br />
                                <Input type="number" name="minPrice" value={this.state.minPrice} onChange={this.handleChange} />
                            </Label><br />
                            <p>{this.state.minPriceError}</p>
                            <Label>
                                Description :<br />
                                <textarea name="description" value={this.state.description} onChange={this.handleChange} ></textarea>
                            </Label><br />
                            <p>{this.state.descriptionError}</p>
                            <Label>
                                file:<br />
                                <Input type="file" name="image" onChange={this.fileHandle} multiple />
                            </Label><br />


                            <Label>
                                Date :<br />
                                <select onChange={this.dateHandle}>
                                    <option value="">Select Date</option>
                                    {uniqueSessions.map((session, index) => {
                                        return <option key={session} value={session} >{session}</option>
                                    })}
                                </select>
                            </Label><br />
                            <Label>
                                Start Time :<br />
                                <select onChange={this.handleStart}>
                                    <option value="" >Select Start Time</option>
                                    {
                                        this.state.filterSession.map((t, i) => {
                                            // if (i !== this.state.filterSession.length - 1) {
                                            return <option key={t._id} value={t.startSession}>{t.startSession}</option>
                                            // }

                                        })
                                    }
                                </select>
                            </Label><br />
                            {/* <label>
                        End Time :
                        <select onChange={this.handleEnd} >
                            <option value="">Select End Time</option>
                            {
                                this.state.EndTime.map((t, i) => {
                                    return <option key={i + 1} value={t}>{t}</option>
                                })
                            }
                        </select>
                    </label><br /> */}


                            <Button color="primary">Submit</Button>

                        </Form>


                    </div>
                </div>

            </div>
        )
    }
}