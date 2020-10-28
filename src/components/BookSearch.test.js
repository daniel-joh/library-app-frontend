import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {render as rtlRender, screen} from "@testing-library/react";
import {applyMiddleware, createStore} from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import BookSearch from "./BookSearch";

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

describe('BookSearch', () => {
    it('should render search text', () => {
        render(<BookSearch/>);

        expect(screen.getByText('Search books')).toBeInTheDocument();
    });
});

