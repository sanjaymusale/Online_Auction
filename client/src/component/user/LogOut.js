import React from 'react'
import axios from '../axios/config'
import { connect } from 'react-redux'
import { removeUser } from '../../redux/actions/users'

class LogOut extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedToken: localStorage.getItem('token')
        }
    }

    componentDidMount() {
        //console.log('compon logout')
        axios.delete('/users/logout', { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
               // console.log(response)
                this.props.dispatch(removeUser({}))
                localStorage.removeItem('token')


                this.props.history.push('/user/login')
            })
            .catch((err) => {
                console.log(err)
            })

    }
    render() {
        return (
            <>

            </>
        )
    }
}

export default connect()(LogOut)