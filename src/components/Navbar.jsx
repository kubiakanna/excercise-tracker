import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <nav className="main-nav">
            <NavLink to="/home" activeClassName="active-style">
                Home
            </NavLink>
            <NavLink to="/create-excercise" activeClassName="active-style">
                Create Excercise
            </NavLink>

        </nav>
    )
}
export default Navbar