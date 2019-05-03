import { RootState } from 'typesafe-actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { searchArtistsAsync, updateQueryAsync } from '../actions';
import ArtistList from './ArtistList';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.artists.artists.loading,
  error: state.artists.artists.error,
  query: state.artists.artists.query,
});
const dispatchProps = {
  onClickSearch: searchArtistsAsync.request,
  onChangeQuery: updateQueryAsync.request,
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

type State = {};

class ArtistView extends React.Component<Props, State> {
  render() {
    const { isLoading, onClickSearch, error, onChangeQuery, query } = this.props;
    return (
      <section>
        <h3>Artists</h3>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChangeQuery(event.target.value)}
          disabled={isLoading}
          value={query}
        />
        <button
          onClick={() => onClickSearch('nirv')}
          disabled={isLoading}>
          Search
        </button>
        <p>{error}</p>
        <ArtistList />
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchProps
)(ArtistView);
