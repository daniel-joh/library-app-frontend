import React from 'react';
import {render as rtlRender, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './../reducers';
import BookList from "./BookList";

const initialReducerStateWithFoundBooks = {
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

const initialReducerStateWithNoFoundBooks = {
    library: {
        foundBooks: []
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
}

describe('BookList', () => {
    it('should render table headers', () => {
        render(<BookList/>, { initialState: {} });

        expect(screen.getByText('BookId')).toBeInTheDocument();
        expect(screen.getByText('Isbn')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Author')).toBeInTheDocument();
        expect(screen.getByText('Genre')).toBeInTheDocument();
        expect(screen.getByText('Available')).toBeInTheDocument();
        expect(screen.getByText('Shelf')).toBeInTheDocument();
    });
    it('should render Back to Search button', () => {
        render(<BookList/>, { initialState: {} });

        expect(screen.getByText('Back to Search')).toBeInTheDocument();
    });
    it('should render table data if books are found', () => {
        render(<BookList/>, { initialState: initialReducerStateWithFoundBooks });

        expect(screen.getByText('Stephen King')).toBeInTheDocument();
        expect(screen.getByText('123456789')).toBeInTheDocument();
        expect(screen.getByText('Pestens tid')).toBeInTheDocument();
        expect(screen.getByText('1ABC')).toBeInTheDocument();
        expect(screen.getByText('Loan')).toBeInTheDocument();
        expect(screen.getByText('Details')).toBeInTheDocument();
    });
    it('should not render table data and not show Loan and Details button, if books arent found', () => {
        render(<BookList/>, { initialState: initialReducerStateWithNoFoundBooks });

        expect(screen.queryByText('Loan')).toBeNull();
        expect(screen.queryByText('Details')).toBeNull();
    });

});

