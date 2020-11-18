import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";

let EditUserForm = (props) => {
    const onSubmit = formValues => {
        props.onSubmit(formValues);
    }

    return (
        <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
            <div className="ui segment">
                <div className="ui container">
                    <Field name="username" component={renderInput} label="Username" placeholder="Enter username"/>
                    <Field name="password" component={renderInput} label="New password" type="password"
                           placeholder="Enter new password"/>
                    <Field name="passwordConfirm" component={renderInput} label="Confirm new password" type="password"
                           placeholder="Repeat new password"/>
                    <Field name="email" component={renderInput} label="Email" type="email" placeholder="Enter email"/>
                    <Field name="ssn" component={renderInput} label="SSN" placeholder="Enter ssn"/>
                    <Field name="phoneNumber" component={renderInput} label="Phone number"
                           placeholder="Enter phone number"/>
                    <Field name="firstName" component={renderInput} label="First name" placeholder="Enter first name"/>
                    <Field name="lastName" component={renderInput} label="Last name" placeholder="Enter last name"/>
                    <Field name="streetAddress" component={renderInput} label="Street address"
                           placeholder="Enter street address"/>
                    <Field name="city" component={renderInput} label="City" placeholder="Enter city"/>
                    <Field name="zipCode" component={renderInput} label="Zip code"
                           placeholder="Enter zip code (5 digits)"/>
                    <Field name="country" component={renderInput} label="Country" placeholder="Enter country"/>
                </div>
                <div className="ui container center aligned">
                    <button className="ui button primary" style={{marginTop: '20px'}}>Update user</button>
                </div>
            </div>
        </form>
    );
}

const renderInput = ({input, label, type, placeholder, meta}) => {
    const errorClassName = meta.error && meta.touched ? 'field error' : 'field';
    return (
        <div className={errorClassName}>
            <label>{label}</label>
            <input {...input} type={type} placeholder={placeholder}/>
            <div>{renderError(meta)}</div>
        </div>
    )
};

const renderError = ({error, touched}) => {
    if (touched && error) {
        return (
            <div className="ui error message">
                <div className="header">{error}</div>
            </div>
        )
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.username) {
        errors.username = 'Enter a user name';
    }

    if (formValues.password && formValues.passwordConfirm && formValues.passwordConfirm !== formValues.password) {
        errors.passwordConfirm = 'New Password and confirmed password needs to match!';
    }

    if (!formValues.email) {
        errors.email = 'Enter an email';
    }

    if (!formValues.ssn) {
        errors.ssn = 'Enter a ssn';
    }

    if (!formValues.phoneNumber) {
        errors.phoneNumber = 'Enter a phone number';
    }

    if (!formValues.firstName) {
        errors.firstName = 'Enter first name';
    }

    if (!formValues.lastName) {
        errors.lastName = 'Enter last name';
    }

    if (!formValues.streetAddress) {
        errors.streetAddress = 'Enter street address';
    }

    if (!formValues.city) {
        errors.city = 'Enter city';
    }

    if (!formValues.zipCode) {
        errors.zipCode = 'Enter zip code';
    }

    if (!formValues.country) {
        errors.country = 'Enter country';
    }

    return errors;
}

const mapStateToProps = (state) => {
    return {
        initialValues: state.library.currentUser,
    };
};

EditUserForm = reduxForm({
    form: 'EditUserForm',
    validate: validate
})(EditUserForm);

EditUserForm = connect(mapStateToProps)(EditUserForm);

export default EditUserForm;
