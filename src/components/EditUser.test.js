import {updateUser} from "../apiCalls/apiCalls";
import {fireEvent, render as rtlRender, screen, waitFor} from "@testing-library/react";
import React from "react";
import {applyMiddleware, createStore} from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import EditUser from "./EditUser";

const initialLoggedInState = {
    library: {
        userIsLoggedIn: true,
        currentUser: {
            id: 1,
            username: 'user',
            password: 'password'
        }
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

describe('EditUser', () => {
    it('should show success message if user was updated successfully', async () => {
        updateUser.mockReturnValue({data: {}});

        const {getByPlaceholderText} = render(<EditUser/>, {initialState: initialLoggedInState});

        expect(getByPlaceholderText('Enter username')).toBeInTheDocument();

        fireEvent.change(getByPlaceholderText('Enter username'), {target: {value: 'user'}});

        fireEvent.change(getByPlaceholderText('Enter new password'), {target: {value: 'password'}});

        fireEvent.change(getByPlaceholderText('Repeat new password'), {target: {value: 'password'}});

        fireEvent.change(getByPlaceholderText('Enter first name'), {target: {value: 'first name'}});

        fireEvent.change(getByPlaceholderText('Enter last name'), {target: {value: 'last name'}});

        fireEvent.change(getByPlaceholderText('Enter email'), {target: {value: 'mail@mail.se'}});

        fireEvent.change(getByPlaceholderText('Enter ssn'), {target: {value: '23478927348'}});

        fireEvent.change(getByPlaceholderText('Enter street address'), {target: {value: 'gatan 1'}});

        fireEvent.change(getByPlaceholderText('Enter city'), {target: {value: 'Stockholm'}});

        fireEvent.change(getByPlaceholderText('Enter zip code (5 digits)'), {target: {value: '12345'}});

        fireEvent.change(getByPlaceholderText('Enter country'), {target: {value: 'Sverige'}});

        fireEvent.change(getByPlaceholderText('Enter phone number'), {target: {value: '08111111'}});

        fireEvent.click(screen.getByText('Update user'));

        await waitFor(() => screen.getByText('User updated!'));

        expect(screen.getByText('User updated!')).toBeInTheDocument();
    });
    it('should show error message if user was not updated', async () => {
        updateUser.mockImplementationOnce(() =>
            Promise.reject(new Error('error')),
        );

        const {getByPlaceholderText} = render(<EditUser/>, {initialState: initialLoggedInState});

        expect(getByPlaceholderText('Enter username')).toBeInTheDocument();

        fireEvent.change(getByPlaceholderText('Enter username'), {target: {value: 'user'}});

        fireEvent.change(getByPlaceholderText('Enter new password'), {target: {value: 'password'}});

        fireEvent.change(getByPlaceholderText('Repeat new password'), {target: {value: 'password'}});

        fireEvent.change(getByPlaceholderText('Enter first name'), {target: {value: 'first name'}});

        fireEvent.change(getByPlaceholderText('Enter last name'), {target: {value: 'last name'}});

        fireEvent.change(getByPlaceholderText('Enter email'), {target: {value: 'mail@mail.se'}});

        fireEvent.change(getByPlaceholderText('Enter ssn'), {target: {value: '23478927348'}});

        fireEvent.change(getByPlaceholderText('Enter street address'), {target: {value: 'gatan 1'}});

        fireEvent.change(getByPlaceholderText('Enter city'), {target: {value: 'Stockholm'}});

        fireEvent.change(getByPlaceholderText('Enter zip code (5 digits)'), {target: {value: '12345'}});

        fireEvent.change(getByPlaceholderText('Enter country'), {target: {value: 'Sverige'}});

        fireEvent.change(getByPlaceholderText('Enter phone number'), {target: {value: '08111111'}});

        fireEvent.click(screen.getByText('Update user'));

        await waitFor(() => screen.getByText('Failed to update user! Try again'));

        expect(screen.getByText('Failed to update user! Try again')).toBeInTheDocument();
    });

    it('should show warning if password and confirm password did not match', async () => {
        updateUser.mockReturnValue({data: {}});
        const {getByText, getByPlaceholderText} = render(
            <EditUser/>, {initialState: initialLoggedInState});

        expect(getByPlaceholderText('Enter new password')).toBeInTheDocument();

        fireEvent.change(getByPlaceholderText('Enter new password'), {target: {value: 'password'}});

        fireEvent.change(getByPlaceholderText('Repeat new password'), {target: {value: 'p'}});

        fireEvent.change(getByPlaceholderText('Enter username'), {target: {value: 'user'}});

        fireEvent.change(getByPlaceholderText('Enter first name'), {target: {value: 'first name'}});

        fireEvent.change(getByPlaceholderText('Enter last name'), {target: {value: 'last name'}});

        fireEvent.change(getByPlaceholderText('Enter email'), {target: {value: 'mail@mail.se'}});

        fireEvent.change(getByPlaceholderText('Enter ssn'), {target: {value: '23478927348'}});

        fireEvent.change(getByPlaceholderText('Enter street address'), {target: {value: 'gatan 1'}});

        fireEvent.change(getByPlaceholderText('Enter city'), {target: {value: 'Stockholm'}});

        fireEvent.change(getByPlaceholderText('Enter zip code (5 digits)'), {target: {value: '12345'}});

        fireEvent.change(getByPlaceholderText('Enter country'), {target: {value: 'Sverige'}});

        fireEvent.change(getByPlaceholderText('Enter phone number'), {target: {value: '08111111'}});

        fireEvent.click(getByText('Update user'));

        expect(getByText('New Password and confirmed password needs to match!')).toBeInTheDocument();
    });
});

