import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {render as rtlRender, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "./App";
import {applyMiddleware, createStore} from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

const initialLoggedInState = {
    library: {
        userIsLoggedIn: true,
        loans: [],
        loanCart: []
    }
};

const initialNotLoggedInState = {
    library: {
        userIsLoggedIn: false
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

describe('App', () => {
    it('should navigate to Home if user is logged in', () => {
        render(<App/>, {initialState: initialLoggedInState});

        const leftClick = {button: 0}
        userEvent.click(screen.getByText(/home/i), leftClick);

        expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
    it('should navigate to Search books if user is logged in', () => {
        render(<App/>, {initialState: initialLoggedInState});

        const leftClick = {button: 0}
        userEvent.click(screen.getByText('Search Books'), leftClick);

        expect(screen.getByText(/author/i)).toBeInTheDocument();
    });
    it('should navigate to LoanCart if user is logged in', () => {
        const {container} = render(<App/>, {initialState: initialLoggedInState});

        const leftClick = {button: 0}

        const icon = container.querySelector('i');
        expect(icon).toBeInTheDocument();

        userEvent.click(icon, leftClick);

        expect(screen.getByText('Empty Loan Cart')).toBeInTheDocument();
    });
    it('should navigate to Loans if user is logged in', () => {
        render(<App/>, {initialState: initialLoggedInState});

        const leftClick = {button: 0}
        userEvent.click(screen.getByText('Loans'), leftClick);

        expect(screen.getByText('No loans available!')).toBeInTheDocument();
    });
    it('should navigate to User Profile if user is logged in', () => {
        render(<App/>, {initialState: initialLoggedInState});

        const leftClick = {button: 0}
        userEvent.click(screen.getByText('User Profile'), leftClick);

        expect(screen.getByText('Edit user')).toBeInTheDocument();
    });
    it('should navigate to Login if user hasnt logged in', () => {
        const {container} = render(<App/>, {initialState: initialNotLoggedInState});

        const leftClick = {button: 0}
        userEvent.click(screen.getByText('Login'), leftClick);

        expect(container.querySelector('h3')).toHaveTextContent('Login');
    });
    it('should navigate to Register if user hasnt logged in', () => {
        const {container} = render(<App/>, {initialState: initialNotLoggedInState});

        const leftClick = {button: 0}
        userEvent.click(screen.getByText('Register'), leftClick);

        expect(container.querySelector('h3')).toHaveTextContent('Register user');
    });
});

