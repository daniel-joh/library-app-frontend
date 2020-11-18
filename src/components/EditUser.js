import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {updateUser} from "../actions";
import EditUserForm from "./EditUserForm";

const EditUser = (props) => {
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

        if (username !== props.currentUser.username && !password) {
            setErrorMessage('You need to re-enter your password if username is to be changed! Try again');
            return;
        }

        const userDto = {
            id: props.currentUser.id,
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

        const possibleError = await props.updateUser(userDto, props.currentUser);

        if (possibleError) {
            setErrorMessage('Failed to update user! Try again');
        } else {
            setSuccessMessage('User updated!');
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
            <div className="ten wide column centered">
                <div className="ui container">
                    <h3 style={{textAlign: 'center'}}>Edit user</h3>
                    <EditUserForm onSubmit={onSubmit} {...props}/>
                    {renderMessage()}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.library.currentUser
    };
};

export default connect(mapStateToProps, {updateUser})(EditUser);