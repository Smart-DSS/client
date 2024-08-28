'use client';

import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const CCTVPlayer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className="player-wrapper">
      <ReactPlayer
        url="http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8"
        playing
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default CCTVPlayer;
