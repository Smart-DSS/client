// /dashboard/flood/FloodPage.jsx

"use client";

import React from "react";
import ShelterComponent from "./_components/ShelterComponent";
import FloodMapComponent from "./_components/FloodMapComponent";
import FloodComponent from "./_components/FloodComponent";
import RelocateResidents from "./_components/RelocateResidents";
// import ShelterComponent from "../_components/ShelterComponent";
// import FloodComponent from "../_components/FloodComponent";
// import FloodMapComponent from "../_components/FloodMapComponent";

const FloodPage = () => {
  const sendPushNotification = async () => {
    console.log("clicked")
    const response = await fetch("/api/sendNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken:
          "ya29.c.c0ASRK0GZZ2LWZLOzuXbMC6dn586UDxCZPfHzVETAITB1IVBARbNbOma5VyPCkFpFGrUYjlBZYnUtfmyG4DFIidpDgWjbfLV68YLu7xGJnXV_D-mH1Hhh5wAjOv57MoG6UmPHWX4Mkd14juxRr50piNYJGcE0WjEk4K_EQ4G06XbrGxmu-gnb5NJCbHOuXJAzdIofdjL7Lss8CSqVI_mLKpr-s_TEajSvf-0iy9EK7e8baZ-p6_YmWhiIW1eodJZBteKTen7IAkkXD7He3FcMgLAVxrplT6BIpeotHO725Df3pFjkEySLoZOgXoVQP4Mb5UoTsFpKrjCpczELEpPA0QKx9yM3T4mmJQEP2heLI5AAQ0jLjCzDnmlrQnObjL389PQJZXe_VmMm6n7afUjrVFoIuidX4M4B2vaJQ7ZcUc4y_gqmgVhwiZwvrhb-1RQV3U37ezMVX6hxJ2VmzQpOM7MSc4fjSdqx66zeYR28nU6_yFxdoR3eMYvWzfBwXnyzloa9bryYvbSf1IrObhmp3_40a37exs77rxIRvnuaJuJpmmQSX-e_kFJxRrleOwwbV2eYXc14ZFnll0Ra9_lywkvox4zIrUp_w18irYwnbgc1otuztg1z8umvJF-Xr_si2_xntd0jzlIp8BlzQvQzgZp8ZfstRIRgYJQ8JhsvBRc_1RsvlwptQmyuYgd2mBpRFMV2iOw5atBizRaeSbMh31UozI-Qh7umJyttZu_5azgr4knJglk5hX6BcB04-k8-wp9wfY88Yawz9YO-sIFy3uuOOy__ood-o4seR0iZhyybc4jomFj4Uumf8s8SwMy4_1USaUfmzfh7Q2JrjWfYvkk81awr9gjYS6SF2QUaIh2nobhdegzga8_4dvYM7l1n1erI6ReI35qrYWfjz-ZjboOwcX8t21Ftqx-8gqhmk8BQ_8ytabbt9u7BQ2_pxuROI6uBn1305v85M6WcMkfp52W9r-r-79xy5xicMnlgolp",
        message: {
          token:
            "dLJ-EsLrSlSMzpLRCqM8Pc:APA91bHs3hykPeEWQ9E6bDRwdyZEHfu5ay1dwnuoORBOSaOxuDlc9rDDrdJdAcbzUITWNHaOfFxZfM-L-DVet8QRQQWD2yqm8B9V2F_FgXbesdGleTq6PeSmElh8A7clHUzJNvzvFFaw",
          notification: {
            body: "This is an Alert notification message!",
            title: "Nirnai Alert",
          },
        },
      }),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 justify-center w-full px-[4%] py-[2%]">
      <div className="w-full col-span-1 md:col-span-2">
        <ShelterComponent />
      </div>
      <div className="w-full col-span-1 md:col-span-3">
        <FloodMapComponent />
      </div>
      <div className="w-full col-span-1 md:col-span-2 grid grid-row-5 gap-4">
        <RelocateResidents/>
        <FloodComponent/>
        {/* <div onClick={sendPushNotification} className="px-5 py-2 bg-red-300 m-5 rounded-lg cursor-pointer">Realocate citizens</div> */}
      </div>
    </div>
  );
};

export default FloodPage;
