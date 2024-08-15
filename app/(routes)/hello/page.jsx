"use client";

import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>You are not authenticated</div>;
  }

  return (
    <div>
      {session?.user?.email ? (
        <div>User email: {session.user.email}</div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
};

export default page;
