import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = (props) => {

    const { component: Component, ...rest } = props
    // console.log('pro', props)
    const { user } = props
    return (

        <Route {...rest} render={(props) => (

            !user.isAuthenticated ?
                <><Redirect to='/user/login' /></>
                :

                (user.isAuthenticated && user.user.role === 'admin')
                    ? <Component {...props} />
                    :
                    <>
                        <Redirect to='/notfound' />
                    </>
        )} />

    )
}
const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}


export default connect(mapStateToProps)(AdminRoute)
