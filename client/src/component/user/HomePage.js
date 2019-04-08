import React from 'react'
//import axios from '../axios/config';
import { connect } from 'react-redux'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            product: {}
        }

    }




    // componentDidMount() {


    // }

    render() {
        const name = this.props.user.user.firstName[0].toUpperCase() + this.props.user.user.firstName.slice(1).toLowerCase()
        console.log(name)
        return (
            <div>
                {/* <h2>{this.state.product.sellerId}</h2> */}
                <br />
                <h2>Welcome  <span> {name} </span> at DCT@academy.com</h2>

            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(HomePage)

