import { RootState } from 'typesafe-actions';
import * as React from 'react';
import { connect } from 'react-redux';
import * as selectors from '../selectors';
import ArtistListItem from './ArtistListItem';

const mapStateToProps = (state: RootState) => ({
  isLoading: selectors.isLoading(state.artists),
  artists: selectors.getArtists(state.artists),
});

type Props = ReturnType<typeof mapStateToProps>;

function ArtistList({ isLoading, artists = [] }: Props) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul style={getStyle()}>
      {artists.map(artist => (
        <li key={artist.id}>
          <ArtistListItem
            id={artist.id}
            title={artist.title}
          />
        </li>
      ))}
    </ul>
  );
}

const getStyle = (): React.CSSProperties => ({
  textAlign: 'left',
  margin: 'auto',
  maxWidth: 500,
});

export default connect(
  mapStateToProps
)(ArtistList);
