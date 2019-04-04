import React from 'react'
import { Link } from 'react-router-dom'

const User = () => {
    return (
        <>
            <ul className="navbar-nav mr-auto">

                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle " to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="text-white">Actions</span>
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link to="/user/dashboard" className="dropdown-item">Dashboard</Link>
                        <Link to="/product" className="dropdown-item">Add Product</Link>

                        <Link to='/currentBid' className="dropdown-item">Current Bid</Link>
                        <Link to='/myproduct' className="dropdown-item">My Product</Link>

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

export default User