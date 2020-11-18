import React from 'react';
import {connect} from "react-redux";
import {addBookToLoanCart} from '../actions';
import history from "../history";

const BookList = (props) => {
    const renderRow = () => {
        return props.foundBooks.map(book => {
            if (props.loanCart && props.loanCart.filter(loanBook => loanBook.bookId === book.bookId).length === 1) {
                return;
            }

            if (!book.availableForLoan) {
                return (
                    <tr key={book.bookId}>
                        <td>{book.bookId}</td>
                        <td>{book.isbn}</td>
                        <td>{book.title}</td>
                        <td>{book.authorName}</td>
                        <td>{book.publishedYear}</td>
                        <td>{book.genreName}</td>
                        <td className="center aligned">
                            <i className="red minus icon"></i>
                        </td>
                        <td>{book.shelf}</td>
                        <td></td>
                        <td></td>
                    </tr>
                )
            } else {
                return (
                    <tr key={book.bookId}>
                        <td>{book.bookId}</td>
                        <td>{book.isbn}</td>
                        <td>{book.title}</td>
                        <td>{book.authorName}</td>
                        <td>{book.publishedYear}</td>
                        <td>{book.genreName}</td>
                        <td className="center aligned">
                            <i className="green checkmark icon"></i>
                        </td>
                        <td>{book.shelf}</td>
                        <td className="center aligned">
                            <button className="ui button primary" onClick={() => props.addBookToLoanCart(book)}>Loan
                            </button>
                        </td>
                        <td className="center aligned">
                            <button className="ui button primary"
                                    onClick={() => history.push('/book/details/' + book.bookId)}>Details
                            </button>
                        </td>
                    </tr>
                )
            }
        });
    };

    const renderTable = () => {
        return (
            <div>
                <table className="ui selectable celled table">
                    <thead>
                    <tr>
                        <th>BookId</th>
                        <th>Isbn</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published year</th>
                        <th>Genre</th>
                        <th>Available</th>
                        <th>Shelf</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderRow()}
                    </tbody>
                </table>
                <div className="ui container center aligned">
                    <button className="ui button primary" onClick={history.goBack}>Back to Search</button>
                </div>
            </div>
        )
    };

    return (
        <div className="ui grid">
            <div className="sixteen wide column centered">
                <div className="ui container">
                    <h2 style={{textAlign: 'center'}}>Found books</h2>
                    <div>
                        {renderTable()}
                    </div>
                </div>
            </div>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        foundBooks: state.library.foundBooks,
        loanCart: state.library.loanCart
    };
};

export default connect(mapStateToProps, {addBookToLoanCart})(BookList);