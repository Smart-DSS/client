// "use client";

// import React, { useEffect, useState } from "react";
// import Navbar from "../../_components/Navbar";
// import Footer from "@/app/_components/Footer";
// import ShareFeedback from "./_components/ShareFeedback";
// import DisclaimerQuote from "./_components/DisclaimerQuote";
// import Procedure from "./_components/ProcedureComponent";
// // import MapComponent from "./_components/MapComponent";
// import AlertBox from "./_components/AlertBox";
// import ScrollingAlert from "./_components/ScrollingAlert";
// import { app } from "@/config/FirebaseConfig";
// import { doc, getDoc, getFirestore } from "firebase/firestore";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import { useRouter } from "next/navigation";
// import Loading from "@/app/_components/Loading";
// import dynamic from "next/dynamic";
// import Role from "./_components/Role";
// import LocationCards from "./_components/LocationCards";
// import EsclateBox from "./_components/EscalateBox";
// import ShelterComponent from "./_components/ShelterComponent";

// const MapComponent = dynamic(() => import("./_components/MapComponent"), {
//   ssr: false,
// });

// const page = () => {
//   const db = getFirestore(app);
//   const { user } = useKindeBrowserClient();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [stage, setStage] = useState(3);
//   const [rainStatus, setRainStatus] = useState()
//   const [waterLevel, setWaterLevel] = useState()

//   const getStage = async () => {
//     // const docRef = doc(db, "stage", "stage");
//     const docRef = doc(db, "Flood-data", "waterlevel-1");
//     try {
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         // does user exist or not
//         console.log("stage data:", docSnap.data());
//         // setStage(docSnap.data()?.stage);
//         setRainStatus(docSnap.data()?.rainStatus);
//         setWaterLevel(docSnap.data()?.waterLevel);

//       } else {
//         console.log("No such stage!");
//       }
//     } catch (error) {
//       console.log("No such stage!");
//     }
//   };

//   useEffect(() => {
//     getStage();
//   }, []);

//   useEffect(() => {
//     user && isUserRegistered();
//   }, [user]);

//   const isUserRegistered = async () => {
//     const docRef = doc(db, "UserDetails", user.email); //business-collection name, "SF"-name of the document
//     try {
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         // does user exist or not
//         console.log("Document data:", docSnap.data());
//         setLoading(false);
//       } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//         router.replace("/user-details");
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log("No such document!");
//       router.replace("/user-details");
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <div>
//       <Navbar />
//       <div>
//         <ScrollingAlert />
//         {/* <div className="flex flex-col md:flex-row justify-center p-[4%]"> */}
//         <div className="grid grid-cols-1 md:grid-cols-7 gap-4 justify-center w-full px-[4%] py-[2%]">
//           <div className="w-full col-span-1 md:col-span-2">
//             <ShelterComponent />
//           </div>
//           <div className="w-full col-span-1 md:col-span-3">
//             <MapComponent />
//           </div>
//           <div className="w-full col-span-1 md:col-span-2">
//             <LocationCards />
//           </div>
//         </div>

//         {/* Hi {name}, your mobile number {phone} is fetched directly from firebase */}
//         <div className="p-4 md:p-20 bg-[#F0F0F0] rounded-t-3xl">
//           {/* <div className="justify-between lg:flex"> */}
//           <div className="flex justify-center pb-10">
//             <AlertBox stage={stage} />
//           </div>
//           <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:gap-0">
//             <EsclateBox />
//             <Role rainStatus={rainStatus} waterLevel={waterLevel} />
//             <Procedure />
//           </div>
//         </div>
//       </div>
//       <div className="py-10 flex justify-center">
//         <ShareFeedback />
//       </div>
//       <DisclaimerQuote />
//       <Footer />
//     </div>
//   );
// };

// export default page;


// /dashboard/page.jsx

"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../_components/Navbar";
import Footer from "@/app/_components/Footer";
import ShareFeedback from "./_components/ShareFeedback";
import DisclaimerQuote from "./_components/DisclaimerQuote";
import Procedure from "./_components/ProcedureComponent";
import dynamic from "next/dynamic";
import AlertBox from "./_components/AlertBox";
import ScrollingAlert from "./_components/ScrollingAlert";
import { app } from "@/config/FirebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import Loading from "@/app/_components/Loading";
import Role from "./_components/Role";
import LocationCards from "./_components/LocationCards";
import EsclateBox from "./_components/EscalateBox";
import ShelterComponent from "./_components/ShelterComponent";
import { ShelterProvider } from "@/context/ShelterContext";

const MapComponent = dynamic(() => import("./_components/FloodMapComponent"), {
  ssr: false,
});

// Import the FloodComponent dynamically
const FloodComponent = dynamic(() => import("./flood/FloodPage"), {
  ssr: false,
});
// Import the CrowdComponent dynamically
const CrowdComponent = dynamic(() => import("./crowd/CrowdPage"), {
  ssr: false,
});

const Page = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState(3);
  const [rainStatus, setRainStatus] = useState();
  const [waterLevel, setWaterLevel] = useState();
  const [currentView, setCurrentView] = useState(null);

  const getStage = async () => {
    // const docRef = doc(db, "Flood-data", "waterlevel-1");
    console.log("reached here")
    const docRef = doc(db, "stage", "stage");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("stage data:", docSnap.data());
        // setRainStatus(docSnap.data()?.rainStatus);
        // setWaterLevel(docSnap.data()?.waterLevel);
        setStage(docSnap.data()?.stage);
      } else {
        console.log("No such stage!");
      }
    } catch (error) {
      console.log("No such stage!");
    }
  };

  useEffect(() => {
    getStage();
  }, []);

  useEffect(() => {
    if (user) isUserRegistered();
  }, [user]);

  const isUserRegistered = async () => {
    const docRef = doc(db, "UserDetails", user.email);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setLoading(false);
      } else {
        console.log("No such document!");
        router.replace("/user-details");
        setLoading(false);
      }
    } catch (error) {
      console.log("No such document!");
      router.replace("/user-details");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ShelterProvider>
      <div>
        <Navbar />
        <div>
          <ScrollingAlert />
          <div className="w-full flex justify-center">
            <div className="border-red-500 border-b-2 text-2xl">Warnings</div>
          </div>

          <div className="flex w-full justify-evenly h-16 m-4">
            <button
              className="w-32 bg-blue-200 h-20 rounded-2xl border-blue-900 text-blue-900 border-b-4 flex flex-col items-center justify-center p-2"
              onClick={() => setCurrentView("flood")}
            >
              <img src="/flood.png" alt="Flood" className="w-10 h-10 mb-1" />
              Flood
            </button>
            <button
              className="w-32 bg-blue-200 h-20 rounded-2xl border-blue-900 text-blue-900 border-b-4 flex flex-col items-center justify-center p-2"
              onClick={() => setCurrentView("crowd")}
            >
              <img src="/crowd.png" alt="Crowd" className="w-10 h-10 mb-1" />
              Crowd
            </button>
          </div>
          {/* Header Section */}
          <div className="py-4 text-center text-xl font-bold">
            {currentView === "flood" && "dashboard/flood"}
            {currentView === "crowd" && "dashboard/crowd"}
            {currentView === null && "dashboard"}
          </div>
          <div>
            {currentView === "flood" && <FloodComponent />}
            {currentView === "crowd" && <CrowdComponent />}
          </div>
          <div className="p-4 md:p-20 bg-[#F0F0F0] rounded-t-3xl">
            <div className="flex justify-center pb-10">
              <AlertBox stage={stage} />
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:gap-0">
              <EsclateBox />
              <Role stage={stage} />
              <Procedure />
            </div>
          </div>
        </div>
        <div className="py-10 flex justify-center">
          <ShareFeedback />
        </div>
        <DisclaimerQuote />
        <Footer />
      </div>
    </ShelterProvider>
  );
};

export default Page;
