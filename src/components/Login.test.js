import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {render as rtlRender, screen, waitFor, fireEvent} from "@testing-library/react";
import React from "react";
import {login} from "../apiCalls/apiCalls";
import reducers from "../reducers";
import Login from "./Login";


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

jest.mock("../apiCalls/apiCalls");

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe('Login', () => {
    it('should show success message if user logged in', async () => {
        login.mockReturnValue({data: {}});

        const {queryByPlaceholderText} = render(<Login/>, {initialState: initialNotLoggedInState});

        expect(screen.queryByPlaceholderText(/username/i)).toBeInTheDocument();

        fireEvent.change(queryByPlaceholderText('Enter username'), {target: {value: 'user'}})

        fireEvent.change(queryByPlaceholderText('Enter password'), {target: {value: 'password'}})

        fireEvent.click(screen.getByTestId('login-button'));

        await waitFor(() => screen.getByText('User has logged in!'));

        expect(screen.getByText('User has logged in!')).toBeInTheDocument();
    });
    it('should show error message if user failed to log in', async () => {
        login.mockImplementationOnce(() =>
            Promise.reject(new Error('error')),
        );

        const {queryByPlaceholderText} = render(<Login/>, {initialState: initialNotLoggedInState});

        expect(screen.queryByPlaceholderText(/username/i)).toBeInTheDocument();

        fireEvent.change(queryByPlaceholderText('Enter username'), {target: {value: 'user'}})

        fireEvent.change(queryByPlaceholderText('Enter password'), {target: {value: 'password'}})

        fireEvent.click(screen.getByTestId('login-button'));

        await waitFor(() => screen.getByText('Failed to login user! Try again'));

        expect(screen.getByText('Failed to login user! Try again')).toBeInTheDocument();
    });
});

