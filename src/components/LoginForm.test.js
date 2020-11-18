import {Provider} from "react-redux";
import {render as rtlRender, screen} from '@testing-library/react';
import React from "react";
import {reduxForm} from "redux-form";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
import LoginForm from "./LoginForm";

const DecoratedLoginForm = reduxForm({
    form: 'LoginForm'
})(LoginForm);

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

describe('LoginForm', () => {
    it('should render username input', () => {
        render(<DecoratedLoginForm/>, {});
        expect(screen.getByText(/username/i)).toBeInTheDocument();
    });
    it('should render password input', () => {
        render(<DecoratedLoginForm/>);
        expect(screen.getByText(/password/i)).toBeInTheDocument();
    });
    it('should render Login button', () => {
        render(<DecoratedLoginForm/>);
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });
});
