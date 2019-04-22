import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = (props) => {

    const { component: Component, ...rest } = props
    // console.log('pro', props)
    const { user } = props
    return (

        <Route {...rest} render={(props) => (

            user.isAuthenticated
                ? <Component {...props} />
                : <Redirect to='/user/login' />
        )} />

    )
}
const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}


export default connect(mapStateToProps)(PublicRoute)
