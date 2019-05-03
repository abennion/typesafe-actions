import { RootState } from 'typesafe-actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { searchArtistsAsync, updateQueryAsync } from '../actions';
import ArtistList from './ArtistList';

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

type State = {};

class ArtistView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
  }

  componentDidMount() {
    this.onChangeQuery(this.props.query);
    // this.onClickSearch(this.props.query);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.query !== nextProps.query) {
      this.onChangeQuery(nextProps.query);
      // this.onClickSearch(nextProps.query);
    }
  }

  onChangeQuery(query: string) {
    this.props.requestUpdateQuery(query);
  }

  onClickSearch(query: string) {
    this.props.requestSearchArtsts(query);
  }

  render() {
    const {
      query,
      error,
    } = this.props;

    return (
      <section>
        <h3>Artists</h3>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            this.onChangeQuery(event.target.value)}
          // disabled={loading}
          value={query}
        />
        <button
          onClick={() => this.onClickSearch(query)}
        // disabled={loading}
        >
          Search
        </button>
        <p
          style={{ visibility: error !== '' ? 'visible' : 'hidden' }}
        >{error}</p>
        <ArtistList />
      </section>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  loading: state.artists.artists.loading,
  error: state.artists.artists.error,
  query: state.artists.artists.query,
});

const dispatchProps = {
  requestSearchArtsts: searchArtistsAsync.request,
  requestUpdateQuery: updateQueryAsync.request,
};

export default connect(
  mapStateToProps,
  dispatchProps
)(ArtistView);
