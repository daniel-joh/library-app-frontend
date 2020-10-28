import axios from 'axios';
import { apiPath } from '../config/properties';

export const getBooksBySearchParam =  (title, author, isbn, genre) => {
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
    return axios.get( apiPath + '/books?title=' + title + '&author=' + author + '&isbn=' + isbn + '&genre=' + genre);
}

export const getBookById =  (bookId) => {
    return axios.get(apiPath + '/books/' + bookId);
}

export const createNewLoan =  (loanDto) => {
    return axios.post(apiPath + '/loans',  loanDto);
}

export const getLoansByUserId =  (userId) => {
    return axios.get(apiPath + '/loans?userId=' + userId);
}

export const getLoanById =  (loanId) => {
    return axios.get(apiPath + '/loans/' + loanId);
}

export const returnBookForUser =  (bookId) => {
    return axios.patch(apiPath + '/loans/return/' + bookId);
}

export const getAllGenres =  () => {
    console.log(apiPath + '/genres');
    return axios.get(apiPath + '/genres');
}