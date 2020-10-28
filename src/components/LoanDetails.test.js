import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import {Router, Route} from "react-router-dom";
import {createMemoryHistory} from 'history';
import {getLoanById} from "../apiCalls/apiCalls";
import LoanDetails from "./LoanDetails";

export function renderWithRouterMatch(ui,
                                      {
                                          path = path,
                                          route = route,
                                          history = createMemoryHistory({initialEntries: [route]})
                                      } = {}) {
    return {
        ...render(
            <Router history={history}>
                <Route path={path} component={ui}/>
            </Router>
        )
    };
};

const mockedLoanResponseContainingBookWithNoReturnDate = {
    data: {
        "loanId": 1,
        "active": true,
        "createdDate": "2020-01-01",
        "userId": 1,
        "loanedBooks": [
            {
                "bookId": 1,
                "isbn": "123456",
                "title": "Pestens tid",
                "authorName": "Stephen King",
                "loanDate": "2020-01-01",
                "dueDate": "2020-02-01",
                "returnedDate": null
            }
        ]

    }
};

const mockedLoanResponseContainingBookWithReturnDate = {
    data: {
        "loanId": 2,
        "active": true,
        "createdDate": "2020-01-01",
        "userId": 1,
        "loanedBooks": [
            {
                "bookId": 2,
                "isbn": "234567",
                "title": "Christine",
                "authorName": "Stephen King",
                "loanDate": "2020-07-01",
                "dueDate": "2020-08-01",
                "returnedDate": "2020-07-30"
            }
        ]

    }
};

jest.mock("../apiCalls/apiCalls");

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe('LoanDetails', () => {
    it('should render table headers', () => {
        const {getByText} = renderWithRouterMatch(LoanDetails, {
            route: "/loan/details/1",
            path: "/loan/details/:loanId"
        });
        expect(screen.getByText('Book id')).toBeInTheDocument();
        expect(screen.getByText('Isbn')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Author')).toBeInTheDocument();
        expect(screen.getByText('Loan date')).toBeInTheDocument();
        expect(screen.getByText('Due date')).toBeInTheDocument();
        expect(screen.getByText('Returned date')).toBeInTheDocument();
    });

    it('should render table row data for a loan with a non-returned book', async () => {
        getLoanById.mockResolvedValueOnce(mockedLoanResponseContainingBookWithNoReturnDate);

        const {container} = renderWithRouterMatch(LoanDetails, {
            route: "/loan/details/1",
            path: "/loan/details/:loanId"
        });

        await waitFor(() => screen.getByText('Pestens tid'));

        expect(screen.getByText('Pestens tid')).toBeInTheDocument();
        expect(screen.getByText('123456')).toBeInTheDocument();
        expect(container.querySelector('i')).toBeInTheDocument();       //Icon for a loan being not returned
    });
    it('should render table row data for a loan with a returned book', async () => {
        getLoanById.mockResolvedValueOnce(mockedLoanResponseContainingBookWithReturnDate);

        const {container} = renderWithRouterMatch(LoanDetails, {
            route: "/loan/details/2",
            path: "/loan/details/:loanId"
        });

        await waitFor(() => screen.getByText('Christine'));

        expect(screen.getByText('Christine')).toBeInTheDocument();
        expect(screen.getByText('234567')).toBeInTheDocument();
        expect(screen.getByText('2020-07-30')).toBeInTheDocument();
        expect(container.querySelector('i')).not.toBeInTheDocument();
    });

    it('should render back button', () => {
        renderWithRouterMatch(LoanDetails, {
            route: "/loan/details/2",
            path: "/loan/details/:loanId"
        });
        expect(screen.getByText('Back to Loan List')).toBeInTheDocument();
    });
    it('api error when getting loan should result in alert shown', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementationOnce(() => {
        });

        getLoanById.mockRejectedValueOnce("Error!");

        renderWithRouterMatch(LoanDetails, {
            route: "/loan/details/1",
            path: "/loan/details/:loanId"
        });

        await waitFor(() => screen.getByText(/title/i));

        expect(window.alert).toBeCalledTimes(1);
        alertSpy.mockRestore();
    });

});