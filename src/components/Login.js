import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {performLogin} from "../actions";
import LoginForm from "./LoginForm";

const Login = (props) => {
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    useEffect(() => {
        setErrorMessage();
        setSuccessMessage();
    }, []);

    const onSubmit = async (formValues) => {
        setErrorMessage();
        setSuccessMessage();

        let {username, password} = formValues;
        const userDto = {
            username: username,
            password: password
        }

        const possibleError = await props.performLogin(userDto);

        if (possibleError) {
            setErrorMessage('Failed to login user! Try again');
        } else {
            setSuccessMessage('User has logged in!');
        }

    }

    const renderMessage = () => {
        if (errorMessage) {
            return (
                <div className="ui negative message">
                    <div className="header">
                        {errorMessage}
                    </div>
                </div>
            );
        }

        if (successMessage) {
            return (
                <div className="ui positive message">
                    <div className="header">
                        {successMessage}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="ui grid">
            <div className="six wide column centered">
                <div className="ui container">
                    <h3 style={{textAlign: 'center'}}>Login</h3>
                    <LoginForm onSubmit={onSubmit}/>
                    {renderMessage()}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userIsLoggedIn: state.library.userIsLoggedIn,
        currentUser: state.library.currentUser
    };
};

export default connect(mapStateToProps, {performLogin})(Login);