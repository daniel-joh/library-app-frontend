import React from 'react';
import {render as rtlRender, screen, fireEvent} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import {reduxForm} from 'redux-form';
import BookSearchForm from "./BookSearchForm";
import {applyMiddleware, createStore} from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

const DecoratedBookSearchForm = reduxForm({
    form: 'bookSearchForm'
})(BookSearchForm);

const render = (
    ui,
    {
        store = createStore(reducers, {}, applyMiddleware(thunk)),
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

describe('BookSearchForm', () => {
    it('should render form fields and Search button', () => {
        const genres = ['Thriller', 'Fiction'];
        render(<DecoratedBookSearchForm genres={genres}/>, {});

        expect(screen.getByText(/title/i)).toBeInTheDocument();
        expect(screen.getByText(/author/i)).toBeInTheDocument();
        expect(screen.getByText(/isbn/i)).toBeInTheDocument();
        expect(screen.getByText(/genre/i)).toBeInTheDocument();
        expect(screen.getByText(/thriller/i)).toBeInTheDocument();
        expect(screen.getByText(/fiction/i)).toBeInTheDocument();
        expect(screen.getByText(/search/i)).toBeInTheDocument();
    });
    it('should call onSubmit if Search has been clicked', () => {
        const genres = ['Thriller', 'Fiction'];
        const onSubmit = jest.fn();
        render(<DecoratedBookSearchForm genres={genres} onSubmit={onSubmit}/>, {});

        fireEvent.click(screen.getByText('Search'));

        expect(onSubmit).toBeCalledTimes(1);
    });

});


