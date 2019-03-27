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
            SessionsData: [],
            category: props.category ? props.category : '',
            description: props.description ? props.description : '',
            file: '',
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
        Promise.all([axios.get('/category'), axios.get('/sessions')])
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
        this.props.handleSubmit(formData)
        // console.log()
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
        const uniqueSessions = [...new Set(this.state.SessionsData.map(item => item.date))];
        // console.log(uniqueSessions)
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


                    <label>
                        Date :<select onChange={this.dateHandle}>
                            <option value="">Select Date</option>
                            {uniqueSessions.map((session, index) => {
                                return <option key={session} value={session} >{session}</option>
                            })}
                        </select>
                    </label><br />
                    <label>
                        Start Time :
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
                    </label><br />
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


                    <button>Submit</button>

                </form>
            </div>
        )
    }
}