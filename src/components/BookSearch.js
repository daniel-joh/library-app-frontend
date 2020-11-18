import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import BookSearchForm from "./BookSearchForm";
import {getBooks} from "../actions";
import * as apiCalls from '../apiCalls/apiCalls';

const BookSearch = (props) => {
    const [genres, setGenres] = useState([]);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        const getGenres = async () => {
            try {
                const response = await apiCalls.getAllGenres();
                setGenres(response.data);
            } catch (error) {
                setErrorMessage('Unable to get genres');
            }
        }
        getGenres();
    }, []);

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
    };

    const onSubmit = async (formValues) => {
        let {title, author, isbn, genre} = formValues;

        if (!title && !author && !isbn && !genre) {
            setErrorMessage('Enter search criteria!');
            return;
        }
        const possibleError = await props.getBooks(title, author, isbn, genre);

        if (possibleError) {
            setErrorMessage('Failed to get books!');
        }
    }
    return (
        <div className="ui grid">
            <div className="ten wide column centered">
                <div className="ui container">
                    <h3 style={{textAlign: 'center'}}>Search books</h3>
                    <BookSearchForm onSubmit={onSubmit} genres={genres}/>
                    {renderMessage()}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        foundBooks: state.library.foundBooks
    };
};

export default connect(mapStateToProps, {getBooks})(BookSearch);