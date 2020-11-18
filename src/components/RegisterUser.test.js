import {fireEvent, render as rtlRender, screen, waitFor} from "@testing-library/react";
import React from "react";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import reducers from "../reducers";
import {createUser} from "../apiCalls/apiCalls";
import RegisterUser from "./RegisterUser";

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

describe('RegisterUser', () => {
    it('should show success message if user registered successfully', async () => {
        const {getByTestId, getByPlaceholderText} = render(<RegisterUser/>, {initialState: initialNotLoggedInState});

        expect(getByPlaceholderText('Enter username')).toBeInTheDocument();

        fireEvent.change(getByPlaceholderText('Enter username'), {target: {value: 'user'}});

        fireEvent.change(getByPlaceholderText('Enter password'), {target: {value: 'password'}});

        fireEvent.change(getByPlaceholderText('Repeat password'), {target: {value: 'password'}});

        fireEvent.change(getByPlaceholderText('Enter first name'), {target: {value: 'first name'}});

        fireEvent.change(getByPlaceholderText('Enter last name'), {target: {value: 'last name'}});

        fireEvent.change(getByPlaceholderText('Enter email'), {target: {value: 'mail@mail.se'}});

        fireEvent.change(getByPlaceholderText('Enter ssn'), {target: {value: '23478927348'}});

        fireEvent.change(getByPlaceholderText('Enter street address'), {target: {value: 'gatan 1'}});

        fireEvent.change(getByPlaceholderText('Enter city'), {target: {value: 'Stockholm'}});

        fireEvent.change(getByPlaceholderText('Enter zip code (5 digits)'), {target: {value: '12345'}});

        fireEvent.change(getByPlaceholderText('Enter country'), {target: {value: 'Sverige'}});

        fireEvent.change(getByPlaceholderText('Enter phone number'), {target: {value: '08111111'}});

        fireEvent.click(getByTestId('register-button'));

        await waitFor(() => screen.getByText('User created! Please login'));

        expect(screen.getByText('User created! Please login')).toBeInTheDocument();
    });
    it('should show error message if user was not registered', async () => {
        createUser.mockImplementationOnce(() =>
            Promise.reject(new Error('error')),
        );

        const {getByTestId, getByPlaceholderText} = render(<RegisterUser/>, {initialState: initialNotLoggedInState});

        expect(getByPlaceholderText('Enter username')).toBeInTheDocument();

        fireEvent.change(getByPlaceholderText('Enter username'), {target: {value: 'user'}});

        fireEvent.change(getByPlaceholderText('Enter password'), {target: {value: 'password'}});

        fireEvent.change(getByPlaceholderText('Repeat password'), {target: {value: 'password'}});

        fireEvent.change(getByPlaceholderText('Enter first name'), {target: {value: 'first name'}});

        fireEvent.change(getByPlaceholderText('Enter last name'), {target: {value: 'last name'}});

        fireEvent.change(getByPlaceholderText('Enter email'), {target: {value: 'mail@mail.se'}});

        fireEvent.change(getByPlaceholderText('Enter ssn'), {target: {value: '23478927348'}});

        fireEvent.change(getByPlaceholderText('Enter street address'), {target: {value: 'gatan 1'}});

        fireEvent.change(getByPlaceholderText('Enter city'), {target: {value: 'Stockholm'}});

        fireEvent.change(getByPlaceholderText('Enter zip code (5 digits)'), {target: {value: '12345'}});

        fireEvent.change(getByPlaceholderText('Enter country'), {target: {value: 'Sverige'}});

        fireEvent.change(getByPlaceholderText('Enter phone number'), {target: {value: '08111111'}});

        fireEvent.click(getByTestId('register-button'));

        await waitFor(() => screen.getByText('Failed to create user! Try again'));

        expect(screen.getByText('Failed to create user! Try again')).toBeInTheDocument();
    });
    it('should show warning if user entered a zipcode which isnt 5 digits', async () => {
        const {getByTestId, getByText, getByPlaceholderText} = render(
            <RegisterUser/>, {initialState: initialNotLoggedInState});

        expect(getByPlaceholderText('Enter zip code (5 digits)')).toBeInTheDocument();

        fireEvent.change(getByPlaceholderText('Enter zip code (5 digits)'), {target: {value: 'asdf'}});

        fireEvent.click(getByTestId('register-button'));

        expect(getByText('Zip code must be 5 digits only')).toBeInTheDocument();
    });
    it('should show warning if password and confirm password did not match', async () => {
        const {getByTestId, getByText, getByPlaceholderText} = render(
            <RegisterUser/>, {initialState: initialNotLoggedInState});

        expect(getByPlaceholderText('Enter password')).toBeInTheDocument();

        fireEvent.change(getByPlaceholderText('Enter password'), {target: {value: 'password'}});

        fireEvent.change(getByPlaceholderText('Repeat password'), {target: {value: ''}});

        fireEvent.click(getByTestId('register-button'));

        expect(getByText('Password and confirmed password needs to match!')).toBeInTheDocument();
    });
});
