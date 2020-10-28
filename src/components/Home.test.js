import React from 'react';
import {render as rtlRender} from '@testing-library/react';
import Home from './Home';
import {Router} from 'react-router-dom';
import history from "../history";
import "@testing-library/jest-dom/extend-expect";

const render = () => {
    return rtlRender(
        <Router history={history}>
            <Home/>
        </Router>
    );
};

describe('Home', () => {
    it('should have h1', () => {
        const {container} = render();
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent(/welcome/i);
    });

    it('should have image', () => {
        const {container} = render();
        const img = container.querySelector('img');
        expect(img).toBeInTheDocument();
    });
});