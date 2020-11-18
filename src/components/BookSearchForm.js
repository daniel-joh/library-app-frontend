import React from 'react';
import {Field, reduxForm} from 'redux-form';

const BookSearchForm = (props) => {
    const onSubmit = formValues => {
        props.onSubmit(formValues);
    }

    const renderOptions = () => {
        return props.genres.map(genre => {
            return (
                <option key={genre} value={genre}>{genre}</option>
            )
        });
    }

    const renderSelect = () => {
        return (
            <div className="field">
                <label>Genre</label>
                <div>
                    <Field name="genre" component="select">
                        <option/>
                        {renderOptions()}
                    </Field>
                </div>
            </div>
        )
    }

    return (
        <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
            <div className="ui segment">
                <div className="ui container">
                    <Field name="title" component={renderInput} label="Title" placeholder="Enter title"/>
                    <Field name="author" component={renderInput} label="Author" placeholder="Enter author"/>
                    <Field name="isbn" component={renderInput} label="Isbn" placeholder="Enter isbn"/>
                    {renderSelect()}
                </div>
                <div className="ui container center aligned">
                    <button className="ui button primary" style={{marginTop: '20px'}}>Search</button>
                </div>
            </div>
        </form>
    );
}

const renderInput = ({input, label, placeholder}) => {
    return (
        <div className="field">
            <label>{label}</label>
            <input {...input} placeholder={placeholder}/>
        </div>
    );
};

export default reduxForm({
    form: 'bookSearchForm',
})(BookSearchForm);