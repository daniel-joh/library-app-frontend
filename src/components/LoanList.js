import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import history from "../history";
import {getLoans} from '../actions';

const LoanList = (props) => {
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        const getLoans = async (userId) => {
            const possibleError = await props.getLoans(userId);

            if (possibleError) {
                setErrorMessage('Failed to get loans!');
            }
        }
        if (props.currentUser) {
            getLoans(props.currentUser.id);
        }
    }, []);

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

    const renderNoLoansMessage = () => {
        if (props.loans && props.loans.length === 0) {
            return (
                <div className="ui info message">
                    <div className="header">
                        No loans available!
                    </div>
                </div>
            );
        }
    };

    const renderRow = () => {
        return props.loans.map((loan) => {
            if (loan.active) {
                return (
                    <tr key={loan.loanId}>
                        <td>{loan.loanId}</td>
                        <td className="center aligned">
                            <i className="green checkmark icon"></i>
                        </td>
                        <td>{loan.createdDate}</td>
                        <td className="center aligned">
                            <button onClick={() => history.push('/loan/details/' + loan.loanId + '/' + loan.userId)}
                                    className="ui button primary">Details
                            </button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={loan.loanId}>
                        <td>{loan.loanId}</td>
                        <td className="center aligned">
                            <i className="red minus icon"></i>
                        </td>
                        <td>{loan.createdDate}</td>
                        <td className="center aligned">
                            <button onClick={() => history.push('/loan/details/' + loan.loanId + '/' + loan.userId)}
                                    className="ui button primary">Details
                            </button>
                        </td>
                    </tr>
                )
            }
        })
    };

    const renderTable = () => {
        if (props.loans && props.loans.length > 0) {
            return (
                <div>
                    <table className="ui selectable celled table">
                        <thead>
                        <tr>
                            <th>Loan id</th>
                            <th>Active</th>
                            <th>Created date</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderRow()}
                        </tbody>
                    </table>
                </div>
            )
        }
    };

    return (
        <div className="ui grid">
            <div className="twelve wide column centered">
                <div className="ui container">
                    <div>
                        {renderTable()}
                        {renderErrorMessage()}
                        {renderNoLoansMessage()}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loans: state.library.loans,
        userIsLoggedIn: state.library.userIsLoggedIn,
        currentUser: state.library.currentUser
    };
};

export default connect(mapStateToProps, {getLoans})(LoanList);