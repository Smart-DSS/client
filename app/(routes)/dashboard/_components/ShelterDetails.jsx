// import React from "react";

// const ShelterDetails = () => {
//   return (
//     <div className="flex justify-center p-[1%]">
//       <div className="w-full h-24 bg-[#f1f1f1] rounded-[15px] flex justify-between p-[5%] hover:scale-105 hover:cursor-pointer">
//         <div className="flex flex-col justify-center">
//           <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//             SHELTER 1:
//           </div>
//           <div>
//             <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               Food:{" "}
//             </span>
//             <span className="text-[#02a000] text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               41 days
//               <br />
//             </span>
//             <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               Water:{" "}
//             </span>
//             <span className="text-[#03a100] text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               51 days
//               <br />
//             </span>
//             <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               Meds:{" "}
//             </span>
//             <span className="text-[#03a100] text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               36 days
//             </span>
//           </div>
//         </div>
//         <div className="flex flex-col justify-center">
//           <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//             Accommodation left:
//           </div>
//           <div className="text-black text-4xl font-semibold font-['Radio Canada'] tracking-widest flex justify-center">
//             46
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShelterDetails;

import React, { useState } from "react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";

const db = getFirestore(app);

const ShelterDetails = ({
  id,
  name,
  food,
  water,
  meds,
  accommodationLeft,
  onDelete,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = async () => {
    try {
      await deleteDoc(doc(db, "Availability", id));
      onDelete(id); // Update state in parent component
    } catch (error) {
      console.error("Error deleting document: ", error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const getColor = (value) => {
    if (value < 10) {
      return "text-red-600";
    } else if (value < 20) {
      return "text-orange-600";
    } else {
      return "text-green-600";
    }
  };

  return (
    <div className="flex justify-center p-[1%]">
      <div className="w-full h-24 bg-[#f1f1f1] rounded-[15px] flex justify-between p-[5%] hover:scale-105 hover:cursor-pointer relative">
        <div className="absolute bottom-2 right-2">
          <button
            className="text-red-600 hover:text-red-800 focus:outline-none opacity-20 hover:opacity-100"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 24 24"
            >
              <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
            {name}:
          </div>
          <div>
            <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
              Food:{" "}
            </span>
            <span
              className={`text-xs font-semibold font-['Radio Canada'] tracking-wide ${getColor(
                food
              )}`}
            >
              {food} days
              <br />
            </span>
            <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
              Water:{" "}
            </span>
            <span
              className={`text-xs font-semibold font-['Radio Canada'] tracking-wide ${getColor(
                water
              )}`}
            >
              {water} days
              <br />
            </span>
            <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
              Meds:{" "}
            </span>
            <span
              className={`text-xs font-semibold font-['Radio Canada'] tracking-wide ${getColor(
                meds
              )}`}
            >
              {meds} days
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
            Accommodation left:
          </div>
          <div className="text-black text-4xl font-semibold font-['Radio Canada'] tracking-widest flex justify-center">
            {accommodationLeft}
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
              viewBox="0 0 320.591 320.591"
              onClick={() => setShowDeleteConfirm(false)}
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>

            <div className="my-8">
              <div className="w-full flex justify-center mb-2">
                <h1 className="text-gray-800 text-lg font-semibold mt-4">
                  Confirm user removal
                </h1>
              </div>
              <div className="w-full flex justify-center text-center">
                <h2>
                  Are you sure you want to delete {name} from the platform??
                </h2>
              </div>
              <div className="bg-gray-200 flex flex-col justify-center rounded-lg m-2 p-4">
                <h4 className="text-orange-600">Warning</h4>
                <p className="text-sm text-orange-600 mt-4">
                  By deleting this shelter, associated amenities will also be
                  permanently deleted
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-gray-800 text-sm tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200 w-full"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-white text-sm tracking-wide bg-red-500 hover:bg-red-600 active:bg-red-500 w-full"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterDetails;
