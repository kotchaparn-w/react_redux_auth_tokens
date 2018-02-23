import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/signout">Sign Out</Link>
                </li>
            );
        }
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/signin">Sign In</Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/sigup">Sign Up</Link>
                </li>
            ];
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Redux Auth</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        {this.renderLinks()}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
