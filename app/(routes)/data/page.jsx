"use client";

import DataPage from "@/app/_components/DataPage";
import Loading from "@/app/_components/Loading";
import Navbar from "@/app/_components/Navbar";
import React, { useEffect, useState } from "react";

const page = () => {
  const [jsonData, setJsonData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("http://35.244.45.118:5000/api/home")
    fetch("https://test-uksez4pcka-el.a.run.app/api/home")
      .then((response) => response.json())
      .then((data) => {
        setJsonData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div>
      <Navbar />
      <DataPage data={jsonData} />
    </div>
  );
};

export default page;
