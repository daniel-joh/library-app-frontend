import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import {Router, Route} from "react-router-dom";
import {createMemoryHistory} from 'history';
import {getBookById} from "../apiCalls/apiCalls";
import BookDetails from "./BookDetails";
import {basePath} from '../config/properties';

export function renderWithRouterMatch(ui,
                                      {
                                          path = path,
                                          route = route,
                                          history = createMemoryHistory({initialEntries: [route]})
                                      } = {}) {
    return {
        ...render(
            <Router history={history}>
                <Route path={path} component={ui}/>
            </Router>
        )
    };
};

const mockedBookResponse = {
    data: {
        bookId: 1,
        availableForLoan: true,
        shelf: "",
        isbn: "123456789",
        title: "Pestens tid",
        summary: "en sammanfattning",
        numberOfPages: 900,
        imageUrl: "images/books/test.jpg",
        authorName: "Stephen King",
        genreName: "Thriller"

    }
};

jest.mock("../apiCalls/apiCalls");

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe('BookDetails', () => {
    it('should render table headers', () => {
        renderWithRouterMatch(BookDetails, {
            route: "/book/details/1",
            path: "/book/details/:bookId"
        });
        expect(screen.getByText(/title/i)).toBeInTheDocument();
        expect(screen.getByText(/isbn/i)).toBeInTheDocument();
        expect(screen.getByText(/author/i)).toBeInTheDocument();
        expect(screen.getByText(/genre/i)).toBeInTheDocument();
        expect(screen.getByText(/pages/i)).toBeInTheDocument();
        expect(screen.getByText(/summary/i)).toBeInTheDocument();
    });
    it('should render table row data', async () => {
        getBookById.mockResolvedValueOnce(mockedBookResponse);

        const {container} = renderWithRouterMatch(BookDetails, {
            route: "/book/details/1",
            path: "/book/details/:bookId"
        });

        await waitFor(() => screen.getByText('Pestens tid'));

        expect(screen.getByText('Pestens tid')).toBeInTheDocument();
        expect(container.childElementCount).toBe(1);
    });
    it('should render back button', () => {
        renderWithRouterMatch(BookDetails, {
            route: "/book/details/1",
            path: "/book/details/:bookId"
        });

        expect(screen.getByText('Back to Found books')).toBeInTheDocument();
    });
    it('should set image src to path from mock', async () => {
        getBookById.mockResolvedValueOnce(mockedBookResponse);
        const {container} = renderWithRouterMatch(BookDetails, {
            route: "/book/details/1",
            path: "/book/details/:bookId"
        });

        const image = container.querySelector('img');
        await waitFor(() => image);

        expect(image.src).toContain(basePath + 'images/books/test.jpg');
    });
    it('api error when getting book should result in alert shown', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementationOnce(() => {
        });

        getBookById.mockRejectedValueOnce("Error!");

        renderWithRouterMatch(BookDetails, {
            route: "/book/details/1",
            path: "/book/details/:bookId"
        });

        await waitFor(() => screen.getByText(/title/i));

        expect(window.alert).toBeCalledTimes(1);
        alertSpy.mockRestore();
    });

});


