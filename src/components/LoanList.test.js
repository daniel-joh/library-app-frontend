import React from 'react';
import {render as rtlRender, screen, waitFor} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import reducers from "../reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import LoanList from "./LoanList";

const initialReducerStateWithLoanWithBooks = {
    library: {
        loans:
            [{
            "loanId": 1,
            "active": true,
            "createdDate": "2020-10-01",
            "userId": 1,
            "loanedBooks": [
                {
                    "bookId": 1,
                    "isbn": "123456",
                    "title": "Pestens tid",
                    "authorName": "Stephen King",
                    "loanDate": "2020-10-01",
                    "dueDate": "2020-11-01",
                    "returnedDate": null
                }
            ]
        }]
    }
};

const initialReducerStateWithNoLoans = {
    library: {
        loans: []
    }
};

const render = (
    ui,
    {
        initialState = initialState,
        store = createStore(reducers, initialState, applyMiddleware(thunk)),
        ...renderOptions
    } = {},
) => {
    const Wrapper = ({children}) => <Provider store={store}>{children}</Provider>

    return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
};

describe('LoanList', () => {
    it('should render table headers', () => {
        render(<LoanList/>, {initialState: {}});

        expect(screen.getByText('Loan id')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Created date')).toBeInTheDocument();
    });

    it('should render table row data if loans exist', async () => {
        const { container } = render(<LoanList/>, { initialState: initialReducerStateWithLoanWithBooks });

        await waitFor(() => screen.getByText('2020-10-01'));

        expect(screen.getByText('2020-10-01')).toBeInTheDocument();
        expect(container.querySelector('i')).toBeInTheDocument();
    });
    it('should render Details button', async () => {
        render(<LoanList/>, { initialState: initialReducerStateWithLoanWithBooks });

        expect(await screen.findByText('Details')).toBeInTheDocument();
    });
    it('should not render table row data if loans doesnt exist', async () => {
        const { container } = render(<LoanList/>, { initialState: initialReducerStateWithNoLoans });

        expect(await container.querySelector('td')).not.toBeInTheDocument();
    });

});