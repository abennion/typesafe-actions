import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import todosReducer from '../features/todos/reducer';
import artistsReducer from '../features/discogs/reducer';

const rootReducer = combineReducers({
  router: routerReducer,
  todos: todosReducer,
  artists: artistsReducer,
});

export default rootReducer;
