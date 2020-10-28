import React, { useEffect, useState } from "react";
import history from "../history";
import * as apiCalls from "../apiCalls/apiCalls";

const LoanDetails = (props) => {
    let loanId = props.match.params.loanId;

    const [selectedLoan, setSelectedLoan] = useState({});

    useEffect(() => {
        const getLoan = async (loanId) => {
            try {
                const response = await apiCalls.getLoanById(loanId);
                setSelectedLoan(response.data);
            } catch (error) {
                alert('Unable to find loan!');          //todo: need to add a real popup..
            }
        }
        getLoan(loanId);
    }, []);

    const returnBook = async (bookId) => {
        try {
            await apiCalls.returnBookForUser(bookId);
            history.push('/loans/list');
        } catch (err) {
            alert('Failed to return book!');        //todo: needs a real popup..
        }
    }

    const renderRow = () => {
        if (selectedLoan.loanedBooks) {
            return selectedLoan.loanedBooks.map((loanedBook) => {
                if (loanedBook.returnedDate !== null) {
                    return (
                        <tr key={loanedBook.bookId}>
                            <td>{loanedBook.bookId}</td>
                            <td>{loanedBook.isbn}</td>
                            <td>{loanedBook.title}</td>
                            <td>{loanedBook.authorName}</td>
                            <td>{loanedBook.loanDate}</td>
                            <td>{loanedBook.dueDate}</td>
                            <td>{loanedBook.returnedDate}</td>
                            <td></td>
                        </tr>
                    )
                } else {
                    return (
                        <tr key={loanedBook.bookId}>
                            <td>{loanedBook.bookId}</td>
                            <td>{loanedBook.isbn}</td>
                            <td>{loanedBook.title}</td>
                            <td>{loanedBook.authorName}</td>
                            <td>{loanedBook.loanDate}</td>
                            <td>{loanedBook.dueDate}</td>
                            <td className="center aligned">
                                <i className="black minus icon"></i>
                            </td>
                            <td className="center aligned">
                                <button className="ui button primary" onClick={() => returnBook(loanedBook.bookId)}>
                                    Return book
                                </button>
                            </td>
                        </tr>
                    )
                }
            })
        }
    };

    const renderTable = () => {
        return (
            <div>
                <table className="ui selectable celled table">
                    <thead>
                    <tr>
                        <th>Book id</th>
                        <th>Isbn</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Loan date</th>
                        <th>Due date</th>
                        <th>Returned date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderRow()}
                    </tbody>
                </table>
                <div className="ui hidden divider"></div>
                <div className="ui container center aligned">
                    <button onClick={history.goBack} className="ui button primary">Back to Loan List</button>
                </div>
            </div>
        )
    };

    return (
        <div className="ui container">
            <h2 style={{textAlign:'center'}}>Loan id {loanId} </h2>
            <div>
                {renderTable()}

            </div>
        </div>
    )
};

export default LoanDetails;