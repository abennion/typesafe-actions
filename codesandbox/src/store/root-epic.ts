import { combineEpics } from 'redux-observable';

import * as todosEpics from '../features/todos/epics';
import * as artistsEpics from '../features/discogs/epics';

export default combineEpics(
    ...Object.values(todosEpics),
    ...Object.values(artistsEpics)
);
