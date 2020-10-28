import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {render as rtlRender, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "./App";
import {applyMiddleware, createStore} from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

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

describe('App', () => {
    it('should navigate to Home', () => {
        render(<App/>);

        const leftClick = {button: 0}
        userEvent.click(screen.getByText(/home/i), leftClick);

        expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
    it('should navigate to Search books', () => {
        render(<App/>);

        const leftClick = {button: 0}
        userEvent.click(screen.getByText('Search books'), leftClick);

        expect(screen.getByText(/author/i)).toBeInTheDocument();
    });
    it('should navigate to LoanCart', () => {
        render(<App/>);

        const leftClick = {button: 0}
        userEvent.click(screen.getByText('LoanCart'), leftClick);

        expect(screen.getByText('Empty Loan Cart!')).toBeInTheDocument();
    });
    it('should navigate to Loans', () => {
        render(<App/>);

        const leftClick = {button: 0}
        userEvent.click(screen.getByText('Loans'), leftClick);

        expect(screen.getByText('Loan id')).toBeInTheDocument();
    });
});

