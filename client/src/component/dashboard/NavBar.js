
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Admin from './Admin';
import User from './User'

const Navbar = (props) => {
    // console.log('navbar', props)
    const { isAuthenticated, user } = props.user

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "#000066" }}>
                <i className="material-icons lg-48" style={{ color: '#ffcc66' }}>
                    gavel
                </i>
                <Link className="navbar-brand" to='/'><img src={process.env.PUBLIC_URL + '/icon.png'} height="40px" width="40px" alt="" />{' '}Online Auction</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                    </ul>
                    <div className="form-inline my-2 my-lg-0">
                        {
                            !isAuthenticated ? <>
                                <Link className="btn" to="/user/register" role="button" style={{ background: "#000066", color: '#f3f3f3' }}>Register</Link>
                                <Link className="btn" to='/user/login' role="button" style={{ background: "#000066", color: '#f3f3f3' }}>Login</Link>

                            </>
                                :

                                <>
                                    {user.role === 'admin' ?

                                        <Admin />

                                        :
                                        
                                        <User />
                                    }
                                </>


                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(Navbar)