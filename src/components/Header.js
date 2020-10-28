import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui fixed inverted vertical masthead center aligned segment black">
            <div className="ui container">
                <div className="ui large secondary inverted pointing menu black">
                    <Link className="item" to={'/'}>Home</Link>
                    <Link className="item" to={'/books/search'}>Search books</Link>
                    <Link className="item" to={'/loancart'}>LoanCart</Link>
                    <Link className="item" to={'/loans/list'}>Loans</Link>
                    <div className="right item">
                        <a className="ui inverted button">Log in</a>
                        <a className="ui inverted button">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;