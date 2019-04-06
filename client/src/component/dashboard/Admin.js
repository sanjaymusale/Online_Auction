import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Admin = (props) => {

    const name = props.user.user.firstName[0].toUpperCase() + props.user.user.firstName.slice(1).toLowerCase() + ' ...'
    console.log(name)
    return (
        <>
            <ul className="navbar-nav mr-auto">

                <li className="nav-item active">
                    <Link className="nav-link" href="#">Welcome {name}</Link>
                </li>







                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle " to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="text-white">Actions</span>
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                        <Link to="/category/add" className="dropdown-item">Add Category</Link>
                        <Link to="/category" className="dropdown-item">Category</Link>
                        <Link to='/session/add' className="dropdown-item">Add Session</Link>
                        <Link to='/session/list' className="dropdown-item">View Session</Link>
                        <Link to="/product/list" className="dropdown-item">Products</Link>
                        {/* <Link to='/product' className="dropdown-item">All products</Link> */}



                    </div>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/user">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    {/* <Link className="nav-link" href="#">Link</Link> */}
                </li>

                <li className="nav-item">
                    {/* <Link className="nav-link disabled" href="#">Disabled</Link> */}
                </li>
            </ul>

            <Link className="btn btn-primary" to='/logout' role="button">LogOut</Link>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(Admin)