import React from 'react';
import {render as rtlRender, screen, waitFor, fireEvent} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import reducers from "../reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import LoanCart from "./LoanCart";

const initialReduxStateWithBooksInLoanCart = {
    library: {
        loanCart: [
            {
                bookId: 3,
                availableForLoan: true,
                shelf: '1E',
                isbn: '156756',
                title: 'Christine',
                summary: 'en sammanfattning',
                numberOfPages: 800,
                imageUrl: 'images/books/king.jpg',
                authorName: 'Stephen King',
                genreName: 'Thriller'
            },
            {
                bookId: 7,
                availableForLoan: true,
                shelf: '1E',
                isbn: '345456',
                title: 'Jakten på röd oktober',
                summary: 'en sammanfattning',
                numberOfPages: 950,
                imageUrl: 'images/books/king.jpg',
                authorName: 'Tom Clancy',
                genreName: 'Thriller'
            }
        ]
    }
};

const initialReduxStateWithNoBooksInLoanCart = {
    library: {
        loanCart: []
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

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe('LoanCart', () => {
    it('should render table headers', () => {
        render(<LoanCart/>, {initialState: initialReduxStateWithBooksInLoanCart});

        expect(screen.getByText('BookId')).toBeInTheDocument();
        expect(screen.getByText('Isbn')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Author')).toBeInTheDocument();
        expect(screen.getByText('Shelf')).toBeInTheDocument();
    });
    it('should render buttons', () => {
        render(<LoanCart/>, {initialState: initialReduxStateWithBooksInLoanCart});

        expect(screen.getByText('Loan books')).toBeInTheDocument();
        expect(screen.getByText('Clear cart')).toBeInTheDocument();
    });
    it('should render table row data if there are books in loancart', () => {
        render(<LoanCart/>, {initialState: initialReduxStateWithBooksInLoanCart});

        expect(screen.getByText('156756')).toBeInTheDocument();
        expect(screen.getByText('345456')).toBeInTheDocument();
        expect(screen.getByText('Christine')).toBeInTheDocument();
        expect(screen.getByText('Jakten på röd oktober')).toBeInTheDocument();
        expect(screen.getByText('Stephen King')).toBeInTheDocument();
        expect(screen.getByText('Tom Clancy')).toBeInTheDocument();
    });
    it('should render empty loan cart message if there are no books in loancart', () => {
        render(<LoanCart/>, {initialState: initialReduxStateWithNoBooksInLoanCart});

        expect(screen.getByText('Empty Loan Cart')).toBeInTheDocument();
    });
    it('should render no table rows if Clear cart is clicked', async () => {
        const {container} = render(<LoanCart/>, {initialState: initialReduxStateWithBooksInLoanCart});

        fireEvent.click(screen.getByText('Clear cart'));

        await waitFor(() => screen.getByText('Empty Loan Cart'));

        expect(screen.getByText('Empty Loan Cart')).toBeInTheDocument();
        expect(container.querySelector('td')).not.toBeInTheDocument();
    });

});