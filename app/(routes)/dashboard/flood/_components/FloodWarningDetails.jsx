import React from "react";

const FloodWarningDetails = ({ location, waterLevel }) => {
  return (
    <div className="flex justify-center p-[1%]">
      <div className="w-[90%] h-24 bg-gray-50 rounded-xl flex flex-col justify-between p-[5%] relative hover:bg-gray-100 hover:scale-[1.05] hover:cursor-pointer">
        {/* Alert icon if waterLevel > 250 */}
        {parseFloat(waterLevel) > 250 && (
          <div className="absolute top-[-5%] right-[-5%] bg-red-600 text-white rounded-lg py-3 px-8 gap-1 w-[10%] h-[10%] flex items-center justify-center opacity-90">
            <div>Alert</div>
            <div>⚠️</div>
          </div>
        )}

        {/* Title Section */}
        <div className="flex justify-start w-full">
          <div className="text-black text-sm font-semibold font-['Radio Canada'] tracking-wide bg-gray-100 py-1 px-2 rounded-lg">
            {location}
          </div>
        </div>

        {/* Water Level Display */}
        <div className="text-black text-3xl font-semibold font-['Radio Canada'] tracking-widest flex justify-center">
          {parseFloat(waterLevel).toFixed(2)}
        </div>

        {/* Water Level Label */}
        <div className="text-blue-900 text-[1.5vh] font-semibold font-['Radio Canada'] tracking-wide w-full flex justify-end">
          Water Level
        </div>
      </div>
    </div>
  );
};

export default FloodWarningDetails;




// // /app/dashboard/_components/FloodWarningDetails.jsx

// import { app } from "@/config/FirebaseConfig";
// import { doc, getDoc, getFirestore } from "firebase/firestore";
// import React, { useEffect, useState } from "react";

// const FloodWarningDetails = () => {
//   const db = getFirestore(app);
//   const [waterLevel, setWaterLevel] = useState();
//   const getFloodData = async () => {
//     const docRef = doc(db, "FloodWarning-data", "Cherupuzha");
//     try {
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setWaterLevel(docSnap.data()?.waterLevel);
//       } else {
//         console.log("No such stage!");
//       }
//     } catch (error) {
//       console.log("No such stage!");
//     }
//   };

//   useEffect(() => {
//     getFloodData();
//   }, []);

//   return (
//     // <div className="flex justify-center p-[1%]">
//     //   <div className="w-full h-24 bg-gray-50 rounded-[15px] flex justify-between p-[5%] hover:bg-gray-100 hover:scale-105 hover:cursor-pointer">
//     //     <div className="flex flex-col justify-centern w-[50%]">
//     //       <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//     //       Cherupuzha
//     //       </div>
//     //     </div>
//     //     <div className="flex flex-col justify-center">
//     //       <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//     //         Water Level:
//     //       </div>
//     //       <div className="text-black text-2xl font-semibold font-['Radio Canada'] tracking-widest flex justify-center">
//     //         {parseFloat(waterLevel).toFixed(2)}
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="flex justify-center p-[1%]">
//       <div className="w-[90%] h-24 bg-gray-50 rounded-xl flex flex-col justify-between p-[5%] relative hover:bg-gray-100 hover:scale-[1.05] hover:cursor-pointer">
//         {/* Alert icon if waterLevel > 200 */}
//         {parseFloat(waterLevel) > 250 && (
//           <div className="absolute top-[-5%] right-[-5%] bg-red-600 text-white rounded-lg py-3 px-8 gap-1 w-[10%] h-[10%] flex items-center justify-center opacity-90">
//             <div>Alert</div>
//             <div>⚠️</div>
//           </div>
//         )}

//         {/* Title Section */}
//         <div className="flex justify-start w-full">
//           <div className="text-black text-sm font-semibold font-['Radio Canada'] tracking-wide">
//             Cherupuzha
//           </div>
//         </div>

//         {/* Water Level Display */}
//         <div className="text-black text-3xl font-semibold font-['Radio Canada'] tracking-widest flex justify-center">
//           {parseFloat(waterLevel).toFixed(2)}
//         </div>

//         {/* Water Level Label */}
//         <div className="text-black text-[1.5vh] font-semibold font-['Radio Canada'] tracking-wide w-full flex justify-end">
//           Water Level
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FloodWarningDetails;
