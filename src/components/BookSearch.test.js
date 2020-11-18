import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {fireEvent, render as rtlRender, screen, waitFor} from "@testing-library/react";
import {applyMiddleware, createStore} from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import BookSearch from "./BookSearch";
import {getAllGenres, getBooksBySearchParam} from "../apiCalls/apiCalls";

const initialReduxState = {
    library: {
        foundBooks: [],
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
        store = createStore(reducers, {}, applyMiddleware(thunk)),
        ...renderOptions
    } = {},
) => {
    const Wrapper = ({children}) => <Provider store={store}>{children}</Provider>

    return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
};

const mockedGenres = ['Genre1', 'Genre2', 'Genre3'];

jest.mock("../apiCalls/apiCalls");

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe('BookSearch', () => {
    it('should render genres', async () => {
        getAllGenres.mockReturnValue({data: mockedGenres});

        render(<BookSearch/>, {initialState: initialReduxState});

        await waitFor(() => screen.getByText('Genre1'));

        expect(screen.getByText('Genre1')).toBeInTheDocument();
    });
    it('should show error message if no genres found', async () => {
        getAllGenres.mockImplementationOnce(() =>
            Promise.reject(new Error('error')),
        );
        getBooksBySearchParam.mockReturnValue({data: {}});

        const {getByPlaceholderText} = render(<BookSearch/>, {initialState: initialReduxState});

        fireEvent.change(getByPlaceholderText('Enter title'), {target: {value: 'titel'}});

        fireEvent.click(screen.getByText('Search'));

        await waitFor(() => screen.getByText('Unable to get genres'));

        expect(screen.getByText('Unable to get genres')).toBeInTheDocument();
    });
    it('should show error message if user hasnt entered search criteria', () => {
        getAllGenres.mockReturnValue({data: mockedGenres});

        render(<BookSearch/>, {initialState: initialReduxState});

        fireEvent.click(screen.getByText('Search'));

        expect(screen.getByText('Enter search criteria!')).toBeInTheDocument();
    })
    it('should show error message if no books was found', async () => {
        getAllGenres.mockReturnValue({data: mockedGenres});
        getBooksBySearchParam.mockImplementationOnce(() =>
            Promise.reject(new Error('error')),
        );

        const {getByPlaceholderText} = render(<BookSearch/>, {initialState: initialReduxState});

        fireEvent.change(getByPlaceholderText('Enter title'), {target: {value: 'titel'}});

        fireEvent.click(screen.getByText('Search'));

        await waitFor(() => screen.getByText('Failed to get books!'));

        expect(screen.getByText('Failed to get books!')).toBeInTheDocument();
    })
});

console.error = () => {
};