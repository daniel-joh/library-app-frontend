import {Provider} from "react-redux";
import {render as rtlRender, screen} from '@testing-library/react';
import React from "react";
import {reduxForm} from "redux-form";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
import RegisterUserForm from "./RegisterUserForm";

const DecoratedRegisterUserForm = reduxForm({
    form: 'RegisterUserForm'
})(RegisterUserForm);

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

describe('RegisterUserForm', () => {
    it('should render username input', () => {
        render(<DecoratedRegisterUserForm/>, {});
        expect(screen.getByText(/username/i)).toBeInTheDocument();
    });
    it('should render password input', () => {
        render(<DecoratedRegisterUserForm/>);
        expect(screen.getByText('Password')).toBeInTheDocument();
    });
    it('should render confirm password input', () => {
        render(<DecoratedRegisterUserForm/>);
        expect(screen.getByText('Confirm password')).toBeInTheDocument();
    });
    it('should render email input', () => {
        render(<DecoratedRegisterUserForm/>);
        expect(screen.getByText(/email/i)).toBeInTheDocument();
    });
    it('should render ssn input', () => {
        render(<DecoratedRegisterUserForm/>);
        expect(screen.getByText(/ssn/i)).toBeInTheDocument();
    });
    it('should render phone number input', () => {
        render(<DecoratedRegisterUserForm/>);
        expect(screen.getByText(/phone/i)).toBeInTheDocument();
    });
    it('should render first name input', () => {
        render(<DecoratedRegisterUserForm/>);
        expect(screen.getByText(/first/i)).toBeInTheDocument();
    });
    it('should render last name input', () => {
        render(<DecoratedRegisterUserForm/>);
        expect(screen.getByText(/last/i)).toBeInTheDocument();
    });
    it('should render street address input', () => {
        render(<DecoratedRegisterUserForm/>);
        expect(screen.getByText(/street/i)).toBeInTheDocument();
    });
    it('should render city input', () => {
        render(<DecoratedRegisterUserForm/>);
        expect(screen.getByText(/city/i)).toBeInTheDocument();
    });
    it('should render zipcode input', () => {
        render(<DecoratedRegisterUserForm/>);
        expect(screen.getByText(/zip/i)).toBeInTheDocument();
    });
    it('should render country input', () => {
        render(<DecoratedRegisterUserForm/>);
        expect(screen.getByText(/country/i)).toBeInTheDocument();
    });
    it('should render Register button', () => {
        render(<DecoratedRegisterUserForm/>);
        expect(screen.getByText(/register/i)).toBeInTheDocument();
    });
});
