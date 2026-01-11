// reduers/index
import generation from './generation';
import dragon from './dragon';
import account from './account';
import { combineReducers } from 'redux';
import accountDragons from './accountDragons';

export default combineReducers({ 
    account, 
    dragon, 
    generation, 
    accountDragons 
});
