import axios from 'axios';
import {apiPath} from '../config/properties';

export const getBooksBySearchParam = (title, author, isbn, genre) => {
    if (!title) {
        title = '';
    }

    if (!author) {
        author = '';
    }

    if (!isbn) {
        isbn = '';
    }

    if (!genre) {
        genre = '';
    }
    return axios.get(apiPath + '/books?title=' + title + '&author=' + author + '&isbn=' + isbn + '&genre=' + genre);
}

export const getBookById = (bookId) => {
    return axios.get(apiPath + '/books/' + bookId);
}

export const createNewLoan = (loanDto) => {
    return axios.post(apiPath + '/loans', loanDto);
}

export const getLoansByUserId = (userId) => {
    return axios.get(apiPath + '/loans?userId=' + userId);
}

export const getLoan = (userId, loanId) => {
    return axios.get(apiPath + '/loans/' + loanId + '?userId=' + userId);
}

export const returnBookForUser = (bookId) => {
    return axios.patch(apiPath + '/loans/return/' + bookId);
}

export const getAllGenres = () => {
    return axios.get(apiPath + '/genres');
}

export const login = (userDto) => {
    return axios.post(apiPath + '/login', userDto);
}

export const setAuthorizationHeader = (username, password, userIsLoggedIn) => {
    if (userIsLoggedIn) {
        axios.defaults.headers.common['Authorization'] = `Basic ${btoa(username + ':' + password)}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const createUser = (userDto) => {
    return axios.post(apiPath + '/users', userDto);
}

export const updateUser = (userDto) => {
    return axios.put(apiPath + '/users', userDto);
}