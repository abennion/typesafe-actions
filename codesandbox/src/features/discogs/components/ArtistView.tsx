import { RootState } from 'typesafe-actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { searchArtistsAsync } from '../actions';
import ArtistList from './ArtistList';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.artists.artists.loading,
});
const dispatchProps = {
  requestArtists: searchArtistsAsync.request,
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

type State = {};

class ArtistView extends React.Component<Props, State> {
  render() {
    const { isLoading, requestArtists } = this.props;
    return (
      <section>
        <h3>Artists</h3>
        <button
          onClick={() => requestArtists('nirv')}
          disabled={isLoading}>
          Search
        </button>
        <ArtistList />
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchProps
)(ArtistView);

// we need to connect this....
