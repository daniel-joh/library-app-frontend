import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import libraryReducer from "./libraryReducer";

export default combineReducers({
    form: formReducer,
    library: libraryReducer
});