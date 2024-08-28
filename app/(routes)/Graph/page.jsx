// // pages/index.js

// // import CCTVPlayer from "./_components/CCTVPlayer";
// import PlotComponent from "./_components/PlotComponent";

// export default function Graph() {
//     return (
//         <div>
//             <h1>Home Page</h1>
//             <PlotComponent />
//             {/* <CCTVPlayer/> */}
//         </div>
//     );
// }


'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the CCTVPlayer component with no SSR
const CCTVPlayer = dynamic(() => import('./_components/CCTVPlayer'), { ssr: false });

const LiveStreamPage = () => {
  return (
    <div>
      <h1>Live CCTV Stream</h1>
      <CCTVPlayer />
    </div>
  );
};

export default LiveStreamPage;
