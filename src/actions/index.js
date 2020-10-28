import history from "../history";
import * as apiCalls from "../apiCalls/apiCalls";

export const getBooks = (title, author, isbn, genre) => async dispatch => {
    try {
        const response = await apiCalls.getBooksBySearchParam(title, author, isbn, genre);
        dispatch({type: 'GET_BOOKS', payload: response.data});
        history.push('/books/list');
    } catch (error) {
        return error;
    }
};

export const addBookToLoanCart = (book) => (dispatch) => {
    dispatch({type: 'ADD_BOOK_TO_LOAN_CART', payload: book});
    history.push('/loancart');
};

export const removeBookFromLoanCart = (id) => dispatch => {
    dispatch({type: 'REMOVE_BOOK_FROM_LOAN_CART', payload: id});
};

export const clearLoanCart = () => dispatch => {
    dispatch({type: 'CLEAR_LOAN_CART'});
};

export const createLoan = (loanDto) => async dispatch => {
    try {
        const response = await apiCalls.createNewLoan(loanDto);
        dispatch({type: 'CLEAR_LOAN_CART'});                               //loanCart is cleared when loan has been created
    } catch (error) {
        console.error(error);
    }
}

export const getLoans = (userId) => async dispatch => {
    try {
        const response = await apiCalls.getLoansByUserId(userId);
        dispatch({type: 'GET_LOANS', payload: response.data});
    } catch (error) {
        return error;
    }
};



