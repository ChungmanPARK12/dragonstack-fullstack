// reduers/index
import generation from './generation';
import dragon from './dragon';
import account from './account';
import { combineReducers } from 'redux';
import accountDragons from './accountDragons';
import accountInfo from './accountInfo';
import publicDragons from './publicDragons';

export default combineReducers({ 
    account, 
    dragon, 
    generation, 
    accountDragons ,
    accountInfo,
    publicDragons
});
