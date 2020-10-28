import React from 'react';
import {Router, Route, Link} from 'react-router-dom';
import history from "../history";

import Header from './Header';
import BookSearch from "./BookSearch";
import BookList from "./BookList";
import LoanCart from "./LoanCart";
import LoanList from "./LoanList";
import LoanDetails from './LoanDetails';
import BookDetails from "./BookDetails";
import Home from "./Home";

const App = () => {
    return (
        <div>
            <Router history={history}>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/books/search" exact component={BookSearch}/>
                    <Route path="/books/list" exact component={BookList}/>
                    <Route path="/loancart" exact component={LoanCart}/>
                    <Route path="/loans/list" exact component={LoanList}/>
                    <Route path="/loan/details/:loanId" exact component={LoanDetails}/>
                    <Route path="/book/details/:bookId" exact component={BookDetails}/>
                </div>
            </Router>
        </div>
    );
}
export default App;
