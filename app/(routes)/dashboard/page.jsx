"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../_components/Navbar";
import Footer from "@/app/_components/Footer";
import ShareFeedback from "./_components/ShareFeedback";
import DisclaimerQuote from "./_components/DisclaimerQuote";
import Procedure from "./_components/ProcedureComponent";
import dynamic from "next/dynamic";
import ScrollingAlert from "./_components/ScrollingAlert";
import { app } from "@/config/FirebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Loading from "@/app/_components/Loading";
import Role from "./_components/Role";
import EsclateBox from "./_components/EscalateBox";
import { ShelterProvider } from "@/context/ShelterContext";
import VelocityTimeChart from "./crowd/_components/VelocityTimeChart";
import { useSession } from "next-auth/react";

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
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState(3);
  // const [currentView, setCurrentView] = useState(null);
  const [currentView, setCurrentView] = useState("flood");
  const { data: session, status } = useSession();

  useEffect(() => {
    const getStage = async () => {
      const docRef = doc(db, "stage", "stage");
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStage(docSnap.data()?.stage);
        } else {
          console.log("No such stage!");
        }
      } catch (error) {
        console.error("Error fetching stage data:", error);
      }
    };

    getStage();
  }, [db]);

  useEffect(() => {
    if (status === "authenticated") {
      isUserRegistered();
    } else if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);

  const isUserRegistered = async () => {
    const docRef = doc(db, "UserDetails", session.user.email);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLoading(false);
      } else {
        router.replace("/user-details");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error checking user registration:", error);
      router.replace("/user-details");
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
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

          <div className="w-full flex justify-center h-48 md:h-20 m-4 py-10 md:p-1">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-14">
              <button
                className={`w-16 h-10 md:w-32 md:h-20 rounded-2xl border-blue-900 text-blue-900 border-b-2 flex flex-col items-center justify-center p-2 cursor-not-allowed transition duration-300 ease-in-out opacity-50 ${
                  currentView === "tsunami"
                    ? "bg-blue-300"
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
              >
                <img
                  src="/tsunami.png"
                  alt="Tsunami"
                  className="w-10 h-10 mb-1"
                />
                Tsunami
              </button>
              <button
                className={`w-16 h-10 md:w-32 md:h-20 rounded-2xl border-blue-900 text-blue-900 border-b-2 flex flex-col items-center justify-center p-2 transition duration-300 ease-in-out ${
                  currentView === "flood"
                    ? "bg-blue-300 border-t-2 border-r-2 border-l-2"
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
                onClick={() => setCurrentView("flood")}
              >
                <img src="/flood.png" alt="Flood" className="w-10 h-10 md:mb-1" />
                Flood
              </button>
              <button
                className={`w-16 h-10 md:w-32 md:h-20 rounded-2xl border-blue-900 text-blue-900 border-b-2 flex flex-col items-center justify-center p-2 transition duration-300 ease-in-out ${
                  currentView === "crowd"
                    ? "bg-blue-300 border-t-2 border-r-2 border-l-2"
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
                onClick={() => setCurrentView("crowd")}
              >
                <img src="/crowd.png" alt="Crowd" className="w-10 h-10 mb-1" />
                Crowd
              </button>

              <button
                className={`w-16 h-10 md:w-32 md:h-20 rounded-2xl border-blue-900 text-blue-900 border-b-2 flex flex-col items-center justify-center p-2 cursor-not-allowed transition duration-300 ease-in-out opacity-50 ${
                  currentView === "landslide"
                    ? "bg-blue-300"
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
              >
                <img
                  src="/landslide.png"
                  alt="Landslide"
                  className="w-10 h-10 mb-1"
                />
                Landslide
              </button>
              <button
                className={`w-16 h-10 md:w-32 md:h-20 rounded-2xl border-blue-900 text-blue-900 border-b-2 flex flex-col items-center justify-center p-2 cursor-not-allowed transition duration-300 ease-in-out opacity-50 ${
                  currentView === "earthquake"
                    ? "bg-blue-300"
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
              >
                <img
                  src="/earthquake.png"
                  alt="Earthquake"
                  className="w-10 h-10 mb-1"
                />
                Earthquake
              </button>
              <button
                className={`w-16 h-10 md:w-32 md:h-20 rounded-2xl border-blue-900 text-blue-900 border-b-2 flex flex-col items-center justify-center p-2 cursor-not-allowed transition duration-300 ease-in-out opacity-50 ${
                  currentView === "cyclone"
                    ? "bg-blue-300"
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
              >
                <img
                  src="/cyclone.png"
                  alt="Cyclone"
                  className="w-10 h-10 mb-1"
                />
                Cyclone
              </button>
            </div>
          </div>

          <div className="py-4 text-center text-xl font-bold">
            {currentView === "flood" && "dashboard/flood"}
            {currentView === "crowd" && "dashboard/crowd"}
            {/* {currentView === null && "dashboard/flood"} */}
          </div>

          <div>
            {currentView === "flood" && <FloodComponent />}
            {currentView === "crowd" && <CrowdComponent />}
            {/* {currentView === null && <FloodComponent />} */}
          </div>

          <div className="p-4 md:p-20 bg-[#F0F0F0] rounded-t-3xl">
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
