import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const UserRoute = (props) => {

    const { component: Component, ...rest } = props
    // console.log('pro', props)
    const { user } = props
    return (

        <Route {...rest} render={(props) => (

            !user.isAuthenticated ?
                <><Redirect to='/user/login' /></>
                :

                (user.isAuthenticated && user.user.role === 'user')
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


export default connect(mapStateToProps)(UserRoute)
