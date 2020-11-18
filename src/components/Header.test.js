import React from 'react';
import {render as rtlRender, screen, waitFor} from '@testing-library/react';
import Header from './Header';
import {Router} from 'react-router-dom';
import history from "../history";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
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

describe('Header', () => {
    describe('Logged in user', () => {
        it('should render Home link if logged in', () => {
            render(<Router
                history={history}><Header/></Router>, {initialState: initialLoggedInState});
            expect(screen.getByText(/home/i)).toBeInTheDocument();
        });
        it('should render Search books link if logged in', () => {
            render(<Router
                history={history}><Header/></Router>, {initialState: initialLoggedInState});
            expect(screen.getByText(/search/i)).toBeInTheDocument();
        });
        it('should render LoanCart link/icon if logged in', () => {
            const {container} = render(<Router
                history={history}><Header/></Router>, {initialState: initialLoggedInState});
            const icon = container.querySelector('i');
            expect(icon).toBeInTheDocument();
        });
        it('should render Loans link if logged in', () => {
            render(<Router
                history={history}><Header/></Router>, {initialState: initialLoggedInState});
            expect(screen.getByText(/loans/i)).toBeInTheDocument();
        });
        it('should render User Profile link if logged in', () => {
            render(<Router
                history={history}><Header/></Router>, {initialState: initialLoggedInState});
            expect(screen.getByText(/profile/i)).toBeInTheDocument();
        });
        it('should render Logout link if logged in', () => {
            render(<Router
                history={history}><Header/></Router>, {initialState: initialLoggedInState});
            expect(screen.getByText('Logout')).toBeInTheDocument();
        });
        it('should not render Login link if logged in', () => {
            render(<Router
                history={history}><Header/></Router>, {initialState: initialLoggedInState});
            expect(screen.queryByText('Login')).toBeNull();
        });
        it('should not render Register link if logged in', () => {
            render(<Router
                history={history}><Header/></Router>, {initialState: initialLoggedInState});
            expect(screen.queryByText('Register')).toBeNull();
        });
    });
    describe('Logged out user', () => {
        it('should render Login link if logged out', () => {
            render(<Router
                history={history}><Header/></Router>, {initialState: initialNotLoggedInState});
            expect(screen.getByText('Login')).toBeInTheDocument();
        });
        it('should render Register link if logged out', () => {
            render(<Router
                history={history}><Header/></Router>, {initialState: initialNotLoggedInState});
            expect(screen.getByText('Register')).toBeInTheDocument();
        });
        it('should not render Logout link if logged out', () => {
            render(<Router
                history={history}><Header/></Router>, {initialState: initialNotLoggedInState});
            expect(screen.queryByText('Logout')).toBeNull();
        });
    });
    describe('User clicks Logout button when logged in', () => {
        it('should render Login and Register links if user clicks on Logout button when logged in', async () => {
            render(<Router
                history={history}><Header/></Router>, {initialState: initialLoggedInState});

            const leftClick = {button: 0}
            userEvent.click(screen.getByText('Logout'), leftClick);

            await waitFor(() => screen.getByText(/login/i));

            expect(screen.getByText(/login/i)).toBeInTheDocument();
            expect(screen.getByText(/register/i)).toBeInTheDocument();

            expect(screen.queryByText(/home/i)).toBeNull();
            expect(screen.queryByText(/search/i)).toBeNull();
            expect(screen.queryByText(/loans/i)).toBeNull();
            expect(screen.queryByText(/profile/i)).toBeNull();
        });
    });
});