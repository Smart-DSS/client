import React, { useState } from "react";

const FakeAlarm = () => {
  const [alertState, setAlertState] = useState(null);

  const handleFalseAlarm = () => {
    setAlertState("false");
  };

  const handleAlert = () => {
    setAlertState("alert");
  };

  return (
    <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col m-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
      {alertState === null && (
        <>
          <div className="w-full flex justify-center items-center text-black text-lg font-['Radio Canada'] tracking-wide">
            <div>Potential Reason: </div>
            <div className="font-bold">Fire</div>
          </div>
          <div className="w-full h-[0px] border border-black m-1"></div>
          <div className="w-full h-full p-[2%] overflow-y-auto">
            <div className="w-[271px] text-black text-xs font-light font-['Inter'] leading-[18px] p-4 ">
              <ul className="list-disc list-inside space-y-1">
                <li>Smoke detection</li>
                <li>Heat detection</li>
                <li>Manual alarm activation</li>
                <li>Gas leak detection</li>
                <li>Sprinkler system activation</li>
              </ul>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleFalseAlarm}
                className="bg-[#4355de] hover:bg-[#2c3bbf] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                False Alarm
              </button>
              <button
                onClick={handleAlert}
                className="bg-[#cd0000] hover:bg-[#a00000] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Alert
              </button>
            </div>
          </div>
        </>
      )}
      {alertState === "false" && (
        <div className="w-full h-full flex justify-center items-center bg-[#4355de]/40 text-white text-lg font-['Radio Canada'] tracking-wide p-4 rounded-lg">
          The alert on this camera was dismissed due to a false alarm.
        </div>
      )}
      {alertState === "alert" && (
        <div className="w-full h-full flex justify-center items-center bg-[#cd0000]/40 text-white text-lg font-['Radio Canada'] tracking-wide p-4 rounded-lg">
          Local police units were informed about the anomaly. They will be
          reaching the spot as soon as possible.
        </div>
      )}
    </div>
  );
};

export default FakeAlarm;
