import React from 'react';
import {render as rtlRender, screen } from '@testing-library/react';
import Header from './Header';
import { Router } from 'react-router-dom';
import history from "../history";
import "@testing-library/jest-dom/extend-expect";

const render = () => {
    return rtlRender(
        <Router history={history}>
            <Header />
        </Router>
    );
};

describe('Header', () => {
    it('should render Home link', () => {
        render();
        expect(screen.getByText(/home/i)).toBeInTheDocument();
    });
    it('should render Search books link', () => {
        render();
        expect(screen.getByText(/search/i)).toBeInTheDocument();
    });
    it('should render LoanCart link', () => {
        render();
        expect(screen.getByText(/loancart/i)).toBeInTheDocument();
    });
    it('should render Loans link', () => {
        render();
        expect(screen.getByText(/loans/i)).toBeInTheDocument();
    });
});