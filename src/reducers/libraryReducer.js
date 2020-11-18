const initialState = {
    loanCart: [],
    loans: [],
    foundBooks: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BOOKS':
            return {...state, foundBooks: action.payload};
        case 'ADD_BOOK_TO_LOAN_CART':
            return {...state, loanCart: [...state.loanCart, action.payload]};
        case 'REMOVE_BOOK_FROM_LOAN_CART':
            return {...state, loanCart: [...state.loanCart.filter(book => book.bookId !== action.payload)]};
        case 'CLEAR_LOAN_CART':
            return {...state, loanCart: []};
        case 'GET_LOANS':
            return {...state, loans: action.payload};
        case 'LOGIN':
            return {...state, currentUser: action.payload, userIsLoggedIn: true};
        case 'LOGOUT':
            return {...state, currentUser: {}, userIsLoggedIn: false};
        case 'UPDATE_USER':
            return {...state, currentUser: action.payload};
        default:
            return state;
    }
};