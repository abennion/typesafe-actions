import { routerActions } from 'react-router-redux';
import * as todosActions from '../features/todos/actions';
import * as artistsActions from '../features/discogs/actions';

export default {
  router: routerActions,
  todos: todosActions,
  artists: artistsActions,
};
