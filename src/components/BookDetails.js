import React, {useEffect, useState} from 'react';
import * as apiCalls from "../apiCalls/apiCalls";
import history from "../history";
import { basePath } from '../config/properties';

const BookDetails = (props) => {
    let bookId = props.match.params.bookId;

    const [selectedBook, setSelectedBook] = useState({});

    useEffect(() => {
        const getBook = async (bookId) => {
            try {
                const response = await apiCalls.getBookById(bookId);
                setSelectedBook(response.data);
            } catch (error) {
                alert('Unable to find book!');            //todo: need to add a real popup
            }
        }
        getBook(bookId);
    }, [bookId]);

    const renderTable = () => {
        return (
            <div>
                <img width="300px" height="300px" className="ui image centered" src={basePath + selectedBook.imageUrl} />

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
                        <td>Genre</td>
                        <td>{selectedBook.genreName}</td>
                    </tr>
                    <tr>
                        <td>Number of pages</td>
                        <td>{selectedBook.numberOfPages}</td>
                    </tr>
                    <tr>
                        <td>Summary</td>
                        <td>{selectedBook.summary}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    };

    return (
        <div className="ui container">
            <div>
                {renderTable()}
            </div>
            <div className="ui container center aligned">
                <button onClick={history.goBack} className="ui button primary" style={{marginTop:'20px'}}>Back to Found books</button>
            </div>
        </div>
    )

}

export default BookDetails;