import * as React from 'react';

interface Props {
  title: string;
}

function ArtistListItem({ title }: Props) {
  return (
    <div style={getStyle()}>
      {title}
      <div
        style={{ color: 'darkred', float: 'right', cursor: 'pointer' }}
      >
        X
      </div>
    </div>
  );
}

const getStyle = (): React.CSSProperties => ({
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
});

export default ArtistListItem;
