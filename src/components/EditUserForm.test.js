import {Provider} from "react-redux";
import {render as rtlRender, screen} from '@testing-library/react';
import React from "react";
import {reduxForm} from "redux-form";
import {applyMiddleware, createStore} from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import EditUserForm from "./EditUserForm";

const DecoratedEditUserForm = reduxForm({
    form: 'EditUserForm'
})(EditUserForm);

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
        render(<DecoratedEditUserForm/>, {});
        expect(screen.getByText(/username/i)).toBeInTheDocument();
    });
    it('should render password input', () => {
        render(<DecoratedEditUserForm/>);
        expect(screen.getByText('New password')).toBeInTheDocument();
    });
    it('should render confirm password input', () => {
        render(<DecoratedEditUserForm/>);
        expect(screen.getByText('Confirm new password')).toBeInTheDocument();
    });
    it('should render email input', () => {
        render(<DecoratedEditUserForm/>);
        expect(screen.getByText(/email/i)).toBeInTheDocument();
    });
    it('should render ssn input', () => {
        render(<DecoratedEditUserForm/>);
        expect(screen.getByText(/ssn/i)).toBeInTheDocument();
    });
    it('should render phone number input', () => {
        render(<DecoratedEditUserForm/>);
        expect(screen.getByText(/phone/i)).toBeInTheDocument();
    });
    it('should render first name input', () => {
        render(<DecoratedEditUserForm/>);
        expect(screen.getByText(/first/i)).toBeInTheDocument();
    });
    it('should render last name input', () => {
        render(<DecoratedEditUserForm/>);
        expect(screen.getByText(/last/i)).toBeInTheDocument();
    });
    it('should render street address input', () => {
        render(<DecoratedEditUserForm/>);
        expect(screen.getByText(/street/i)).toBeInTheDocument();
    });
    it('should render city input', () => {
        render(<DecoratedEditUserForm/>);
        expect(screen.getByText(/city/i)).toBeInTheDocument();
    });
    it('should render zipcode input', () => {
        render(<DecoratedEditUserForm/>);
        expect(screen.getByText(/zip/i)).toBeInTheDocument();
    });
    it('should render country input', () => {
        render(<DecoratedEditUserForm/>);
        expect(screen.getByText(/country/i)).toBeInTheDocument();
    });
    it('should render Update user button', () => {
        render(<DecoratedEditUserForm/>);
        expect(screen.getByText('Update user')).toBeInTheDocument();
    });
});

