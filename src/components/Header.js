import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {performLogout} from "../actions";

const Header = (props) => {
    const logout = () => {
        props.performLogout();
    }

    const renderPrimaryLinks = () => {
        if (props.userIsLoggedIn) {
            return (
                <div className="ui large secondary inverted pointing menu black">
                    <Link className="item" to={'/'}>Home</Link>
                    <Link className="item" to={'/books/search'}>Search Books</Link>
                    <Link className="item" to={'/loans/list'}>Loans</Link>
                    <Link className="item" to={'/userprofile'}>User Profile</Link>
                    <Link className="item" to={'/loancart'}><i className="shopping cart icon"></i></Link>
                    <div className="right item">
                        {renderSecondaryLinks()}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="ui large secondary inverted pointing menu black">
                    <div className="right item">
                        {renderSecondaryLinks()}
                    </div>
                </div>
            )
        }
    }

    const renderSecondaryLinks = () => {
        if (props.userIsLoggedIn) {
            return (
                <div>
                    <button onClick={() => logout()} className="ui inverted button">Logout</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Link className="ui inverted button" to={'/login'}>Login</Link>
                    <Link className="ui inverted button" to={'/register'}>Register</Link>
                </div>
            )
        }
    }

    return (
        <div className="ui fixed inverted vertical masthead center aligned segment black">
            <div className="ui container">
                {renderPrimaryLinks()}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userIsLoggedIn: state.library.userIsLoggedIn
    };

};
export default connect(mapStateToProps, {performLogout})(Header);