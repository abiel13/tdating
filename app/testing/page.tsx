"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Testing = () => {
  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div></div>;
};

export default Testing;
