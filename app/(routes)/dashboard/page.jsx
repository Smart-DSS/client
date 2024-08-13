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
import EsclateBox from "./_components/EscalateBox";
import { ShelterProvider } from "@/context/ShelterContext";
import VelocityTimeChart from "./_components/VelocityTimeChart";

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
    console.log("reached here");
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
            <div className="flex justify-center pb-10 w-full">
              {/* <AlertBox stage={stage} /> */}
              <div className="w-full px-10">
                <h1>Velocity vs. Time Chart</h1>
                <VelocityTimeChart />
              </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:gap-0 nav animate-fadeInUp">
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
