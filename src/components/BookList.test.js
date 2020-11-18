import React from 'react';
import {render as rtlRender, screen} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './../reducers';
import BookList from "./BookList";
import userEvent from "@testing-library/user-event";

const initialReduxStateWithFoundBooks = {
    library: {
        foundBooks: [{
            bookId: 1,
            availableForLoan: true,
            shelf: "1ABC",
            isbn: "123456789",
            title: "Pestens tid",
            summary: "en sammanfattning",
            numberOfPages: 900,
            imageUrl: "",
            authorName: "Stephen King",
            genreName: "Thriller"
        }]
    }
};

const initialReduxStateWithNoFoundBooks = {
    library: {
        foundBooks: []
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
}

describe('BookList', () => {
    it('should render table headers', () => {
        render(<BookList/>, {initialState: {}});

        expect(screen.getByText('BookId')).toBeInTheDocument();
        expect(screen.getByText('Isbn')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Author')).toBeInTheDocument();
        expect(screen.getByText('Genre')).toBeInTheDocument();
        expect(screen.getByText('Available')).toBeInTheDocument();
        expect(screen.getByText('Shelf')).toBeInTheDocument();
    });
    it('should render Back to Search button', () => {
        render(<BookList/>, {initialState: {}});

        expect(screen.getByText('Back to Search')).toBeInTheDocument();
    });
    it('should render table data if books are found', () => {
        render(<BookList/>, {initialState: initialReduxStateWithFoundBooks});

        expect(screen.getByText('Stephen King')).toBeInTheDocument();
        expect(screen.getByText('123456789')).toBeInTheDocument();
        expect(screen.getByText('Pestens tid')).toBeInTheDocument();
        expect(screen.getByText('1ABC')).toBeInTheDocument();
        expect(screen.getByText('Loan')).toBeInTheDocument();
        expect(screen.getByText('Details')).toBeInTheDocument();
    });
    it('should not render table data and not show Loan and Details button, if books arent found', () => {
        render(<BookList/>, {initialState: initialReduxStateWithNoFoundBooks});

        expect(screen.queryByText('Loan')).toBeNull();
        expect(screen.queryByText('Details')).toBeNull();
    });
    it('should navigate to Book Details if Details is clicked', () => {
        render(<BookList/>, {initialState: initialReduxStateWithFoundBooks});

        const leftClick = {button: 0}
        userEvent.click(screen.getByText('Details'), leftClick);

        expect(screen.getByText('Pestens tid')).toBeInTheDocument();
    });
    it('should navigate to Search Books if Back to Search is clicked', () => {
        render(<BookList/>, {initialState: initialReduxStateWithFoundBooks});

        const leftClick = {button: 0}
        userEvent.click(screen.getByText('Back to Search'), leftClick);

        expect(screen.getByText('Isbn')).toBeInTheDocument();
    });

});

