import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import BookSearchForm from "./BookSearchForm";
import {getBooks} from "../actions";
import * as apiCalls from '../apiCalls/apiCalls';

const BookSearch = (props) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const response = await apiCalls.getAllGenres();
                setGenres(response.data);
            } catch (error) {
                alert('Failed to get genres');      //todo: needs a real popup..
            }
        }
        getGenres();
    }, []);

    const onSubmit = async (formValues) => {
        let {title, author, isbn, genre} = formValues;

        if (!title && !author && !isbn && !genre) {
            alert('Enter search criteria!');        //todo: needs a real popup
            return;
        }
        const possibleError = await props.getBooks(title, author, isbn, genre);

        if (possibleError) {
            console.log(possibleError.message);
            alert('Failed to get books!');      //todo: needs a real popup..
        }
    }
    return (
        <div className="ui container">
            <h3 style={{textAlign: 'center'}}>Search books</h3>
            <BookSearchForm onSubmit={onSubmit} genres={genres}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        foundBooks: state.library.foundBooks
    };

};

export default connect(mapStateToProps, { getBooks }) (BookSearch);