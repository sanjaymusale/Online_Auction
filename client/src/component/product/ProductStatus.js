import React from 'react'
import { Link } from 'react-router-dom'

export default class MyStatus extends React.Component {
    constructor(props) {
        super(props)
        //console.log(props.status.length)

    }
    render() {

        return (
            <div>
                <ul>
                    {this.props.status.filter(f => f.status === 'Approved').map(product => {
                        return <li key={product._id}><Link to={`/product/${product._id}`}>{product.name} : {product.status}</Link></li>
                    })}
                </ul>

                <ul>
                    {this.props.status.filter(f => f.status === 'Rejected').map(product => {
                        return <li key={product._id}><Link to={`/product/${product._id}`}>{product.name} : {product.status}</Link></li>
                    })}
                </ul>

                <ul>
                    {this.props.status.filter(f => f.status === 'Pending').map(product => {
                        return <li key={product._id}><Link to={`/product/${product._id}`}>{product.name} : {product.status}</Link></li>
                    })}
                </ul>
            </div>
        )

    }


}