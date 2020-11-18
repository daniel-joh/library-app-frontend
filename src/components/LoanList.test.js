import React from 'react';
import {render as rtlRender, screen, waitFor} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import reducers from "../reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {getLoansByUserId} from "../apiCalls/apiCalls";
import LoanList from "./LoanList";

const initialReduxStateWithLoanWithBooks = {
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

const initialReduxStateWithNoLoans = {
    library: {
        loans: [],
        currentUser: {id: 1}
    }
};

const render = (
    ui,
    {
        initialState,
        store = createStore(reducers, initialState, applyMiddleware(thunk)),
        ...renderOptions
    } = {},
) => {
    const Wrapper = ({children}) => <Provider store={store}>{children}</Provider>

    return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
};

jest.mock("../apiCalls/apiCalls");

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe('LoanList', () => {
    it('should render table headers if loans exist', () => {
        render(<LoanList/>, {initialState: initialReduxStateWithLoanWithBooks});

        expect(screen.getByText('Loan id')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Created date')).toBeInTheDocument();
    });

    it('should render table row data if loans exist', async () => {
        const {container} = render(<LoanList/>, {initialState: initialReduxStateWithLoanWithBooks});

        await waitFor(() => screen.getByText('2020-10-01'));

        expect(screen.getByText('2020-10-01')).toBeInTheDocument();
        expect(container.querySelector('i')).toBeInTheDocument();
    });
    it('should render Details button', async () => {
        render(<LoanList/>, {initialState: initialReduxStateWithLoanWithBooks});

        expect(await screen.findByText('Details')).toBeInTheDocument();
    });
    it('should not render table row data if loans doesnt exist', async () => {
        const {container} = render(<LoanList/>, {initialState: initialReduxStateWithNoLoans});


        expect(await container.querySelector('td')).not.toBeInTheDocument();
    });
    it('should render no loans message if no loans exist', () => {
        render(<LoanList/>, {initialState: initialReduxStateWithNoLoans});

        expect(screen.queryByText('No loans available!')).toBeInTheDocument();
    });
    it('api error when getting loans should result in error message shown', async () => {
        getLoansByUserId.mockImplementationOnce(() =>
            Promise.reject(new Error('error')),
        );

        render(<LoanList/>, {initialState: initialReduxStateWithNoLoans});

        await waitFor(() => screen.getByText('Failed to get loans!'));

        expect(screen.getByText('Failed to get loans!')).toBeInTheDocument();
    });
});

console.error = () => {
};