import * as React from 'react';

import TodosView from '../features/todos/components/TodosView';
import ArtistsView from '../features/discogs/components/ArtistView';

export default () => (
  <main>
    <h2>Welcome to "typesafe-actions" reference project implementation!</h2>
    <TodosView />
    <ArtistsView />
  </main>
);
