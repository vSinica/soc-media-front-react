import { combineReducers, createStore } from 'redux';
import { tokenReducer }  from './tokenStore';
import { postsReducer } from './postsStore';
import { currentPageUserReducer } from './currentPageUserStore';
import { friendsReducer } from './friendStore';

const rootReducer = combineReducers({
    tokenReducer: tokenReducer,
    postsReducer: postsReducer,
    currentPageUserReducer: currentPageUserReducer,
    friendsReducer: friendsReducer
});

export const store = createStore(rootReducer);