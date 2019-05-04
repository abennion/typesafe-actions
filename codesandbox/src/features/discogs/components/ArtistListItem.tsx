import * as React from 'react';

interface Props {
  id: number;
  title: string;
}

const getStyle = (): React.CSSProperties => ({
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
});

function ArtistListItem({ id, title }: Props) {
  return (
    <div
      id={id.toString()}
      style={getStyle()}>
      {title}
      {/* <div
        style={{ color: 'darkred', float: 'right', cursor: 'pointer' }}
      >
        X
      </div> */}
    </div>
  );
}

export default ArtistListItem;
