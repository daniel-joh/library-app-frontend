import React, {useEffect, useState} from 'react';
import * as apiCalls from "../apiCalls/apiCalls";
import history from "../history";
import {basePath} from '../config/properties';

const BookDetails = (props) => {
    let bookId = props.match.params.bookId;

    const [selectedBook, setSelectedBook] = useState();
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        const getBook = async (bookId) => {
            try {
                const response = await apiCalls.getBookById(bookId);
                setSelectedBook(response.data);
            } catch (error) {
                setErrorMessage('Unable to find book');
            }
        }
        getBook(bookId);
    }, [bookId]);

    const renderErrorMessage = () => {
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

    const renderTable = () => {
        if (selectedBook) {
            return (
                <div>
                    <img width="300px" height="300px" className="ui image centered"
                         src={basePath + selectedBook.imageUrl}/>

                    <table className="ui definition table">
                        <thead></thead>
                        <tbody>
                        <tr>
                            <td className="two wide column">Title</td>
                            <td className="four wide column">{selectedBook.title}</td>
                        </tr>
                        <tr>
                            <td>Author</td>
                            <td>{selectedBook.authorName}</td>
                        </tr>
                        <tr>
                            <td>Isbn</td>
                            <td>{selectedBook.isbn}</td>
                        </tr>
                        <tr>
                            <td>Published year</td>
                            <td>{selectedBook.publishedYear}</td>
                        </tr>
                        <tr>
                            <td>Genre</td>
                            <td>{selectedBook.genreName}</td>
                        </tr>
                        <tr>
                            <td>Number of pages</td>
                            <td>{selectedBook.numberOfPages}</td>
                        </tr>
                        <tr>
                            <td>Publisher</td>
                            <td>{selectedBook.publisherName}</td>
                        </tr>
                        <tr>
                            <td>Format</td>
                            <td>{selectedBook.format}</td>
                        </tr>
                        <tr>
                            <td>Language</td>
                            <td>{selectedBook.language}</td>
                        </tr>
                        <tr>
                            <td>Summary</td>
                            <td>{selectedBook.summary}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    };

    return (
        <div className="ui grid">
            <div className="sixteen wide column centered">
                <div className="ui container">
                    <div>
                        {renderTable()}
                        {renderErrorMessage()}
                    </div>
                    <div className="ui container center aligned">
                        <button onClick={history.goBack} className="ui button primary" style={{marginTop: '20px'}}>Back
                            to Found books
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BookDetails;