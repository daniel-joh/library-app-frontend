import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {createUser} from "../actions";
import RegisterUserForm from "./RegisterUserForm";

const RegisterUser = (props) => {
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    useEffect(() => {
        setErrorMessage();
        setSuccessMessage();
    }, []);

    const onSubmit = async (formValues) => {
        setErrorMessage();
        setSuccessMessage();

        const {username, password, email, ssn, phoneNumber, firstName, lastName, streetAddress, city, zipCode, country} = formValues;

        const userDto = {
            username: username,
            password: password,
            email: email,
            ssn: ssn,
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName,
            streetAddress: streetAddress,
            city: city,
            zipCode: zipCode,
            country: country
        }

        const possibleError = await props.createUser(userDto);

        if (possibleError) {
            setErrorMessage('Failed to create user! Try again');
        } else {
            setSuccessMessage('User created! Please login');
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
                    <a href="/login">Login</a>
                </div>
            );
        }
    };

    return (
        <div className="ui grid">
            <div className="ten wide column centered">
                <div className="ui container">
                    <h3 style={{textAlign: 'center'}}>Register user</h3>
                    <RegisterUserForm onSubmit={onSubmit}/>
                    {renderMessage()}
                </div>
            </div>
        </div>
    );
};

export default connect(null, {createUser})(RegisterUser);