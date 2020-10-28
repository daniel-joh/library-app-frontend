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
                        <option />
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
                <Field name="title" component={renderInput} label="Title"/>
                <Field name="author" component={renderInput} label="Author"/>
                <Field name="isbn" component={renderInput} label="Isbn"/>
                {renderSelect()}
            </div>
            <div className="ui container center aligned">
                <button className="ui button primary" style={{marginTop:'20px'}}>Search</button>
            </div>
            </div>
        </form>
    );
}

const renderInput = ({input, label}) => {
    return (
        <div className="field">
            <label>{label}</label>
            <input {...input} />
        </div>
    );
};

export default reduxForm({
        form: 'bookSearchForm',
})(BookSearchForm);