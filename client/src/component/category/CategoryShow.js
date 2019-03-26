import React from 'react'
import axios from '../axios/config';
import { Link } from 'react-router-dom'

class ShowCategory extends React.Component {
    constructor() {
        super()
        this.state = {
            category: []
        }

    }
    componentDidMount() {
        axios.get("/category", { headers: { "x-auth": localStorage.getItem("token") } })
            .then(response => {
                //console.log(response.data)
                const category = response.data
                this.setState(() => ({ category }))
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <div>
                {/* <h2>Total {this.state.category.length}</h2> */}
                <ul>
                    {this.state.category.map(cat => {
                        return (
                            <li key={cat._id}>
                                <Link to={`/category/${cat._id}`}>{cat.name}</Link>
                            </li>



                        )

                    })}
                </ul>
                <Link to="/category/add">add</Link>
            </div>
        )
    }

}
export default ShowCategory