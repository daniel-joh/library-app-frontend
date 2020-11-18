import React from 'react';
import {Field, reduxForm} from 'redux-form';

const LoginForm = (props) => {
    const onSubmit = formValues => {
        props.onSubmit(formValues);
    }

    return (
        <div className="ui segment">
            <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
                <div className="ui container">
                    <Field name="username" component={renderInput} label="Username" placeholder="Enter username"/>
                    <Field name="password" component={renderInput} label="Password" type="password"
                           placeholder="Enter password"/>
                </div>
                <div className="ui container center aligned">
                    <button data-testid="login-button" className="ui button primary" style={{marginTop: '20px'}}>Login
                    </button>
                </div>
            </form>
        </div>

    );
}

const renderInput = ({input, label, type, placeholder}) => {
    return (
        <div className="field">
            <label>{label}</label>
            <input {...input} type={type} placeholder={placeholder}/>
        </div>
    );
};

export default reduxForm({
    form: 'LoginForm',
})(LoginForm);