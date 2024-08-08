import React from "react";
import "./ScrollingAlert.css"; // Create this file for additional styles

const ScrollingAlert = () => {
  return (
    <div className="overflow-hidden border-t-2 border-t-red-500 border-b-2 font-mono border-b-red-500 bg-red-200 text-black py-2 my-5">
      <div className="animate-scroll whitespace-nowrap">
        <span className="mx-20">
          A resident is moving to the SHELTER 1 with 3 others. 
        </span>
        <span className="mx-20">
          The available accommodation in SHELTER 1 will decrease to 46!
        </span>
      </div>
    </div>
  );
};

export default ScrollingAlert;
