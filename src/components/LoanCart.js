import React from 'react';
import {connect} from "react-redux";
import {removeBookFromLoanCart, clearLoanCart, createLoan} from "../actions";

const LoanCart = (props) => {
    const renderRow = () => {
        return props.loanCart.map(book => {
            return (
                <tr key={book.bookId}>
                    <td>{book.bookId}</td>
                    <td>{book.isbn}</td>
                    <td>{book.title}</td>
                    <td>{book.authorName}</td>
                    <td>{book.shelf}</td>
                    <td className="center aligned">
                        <button className="ui button primary" onClick={() => props.removeBookFromLoanCart(book.bookId)}>
                            <i className="delete icon"></i>
                        </button>
                    </td>
                </tr>
            )

        });
    };

    const renderTable = () => {
        if (!props.loanCart || props.loanCart.length === 0) {
            return (
                <div>
                    <h2>Empty Loan Cart!</h2>
                </div>
            )
        }

        return (
            <div>
                <h2>Loan Cart</h2>
                <table className="ui selectable celled table">
                    <thead>
                    <tr>
                        <th>BookId</th>
                        <th>Isbn</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Shelf</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderRow()}
                    </tbody>
                </table>
                <div className="ui container center aligned">
                    <button onClick={() => createLoaned(1)} className="ui button primary">Loan books</button>
                    <button style={{marginLeft: '30px'}} onClick={props.clearLoanCart}
                            className="ui button negative">Clear cart
                    </button>
                </div>
            </div>
        )
    };

    const createLoaned = (userId) => {
        let bookIds = [];

        props.loanCart.forEach(book => {
            bookIds.push(book.bookId);
        })

        let loanDto = {
            userId: userId,
            bookIds: bookIds
        }
        props.createLoan(loanDto);
    };

    return (
        <div>
            <div>
                {renderTable()}
            </div>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        loanCart: state.library.loanCart
    };
};

export default connect(mapStateToProps, {removeBookFromLoanCart, clearLoanCart, createLoan})(LoanCart);