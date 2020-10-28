import React, {useEffect} from 'react';
import {connect} from "react-redux";
import history from "../history";
import {getLoans} from '../actions';

const LoanList = (props) => {
    useEffect(() => {
        const getLoans = async (userId) => {
            const possibleError = await props.getLoans(userId);

            if (possibleError) {
                alert('Failed to get loans!');      //todo: needs a real popup..
            }
        }
        getLoans(1);        //todo: userId should come from User object
    }, []);

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
                        <td className="center aligned"><button onClick={() => history.push('/loan/details/' + loan.loanId)} className="ui button primary">Details</button></td>
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
                        <td className="center aligned"><button onClick={() => history.push('/loan/details/' + loan.loanId)} className="ui button primary">Details</button></td>
                    </tr>
                )
            }
        })
    };

    const renderTable = () => {
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
    };

    return (
        <div className="ui container">
            <div>
                {renderTable()}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loans: state.library.loans
    };
};

export default connect(mapStateToProps, {getLoans})(LoanList);