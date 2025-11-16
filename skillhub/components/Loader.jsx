import React from "react";
export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
<div
  className="h-12 w-12 rounded-full 
  border-4 border-transparent 
  animate-spin"
  style={{
    borderImage: "linear-gradient(to right, #000000, #b30000) 1",
    borderStyle: "solid",
  }}
></div>
    </div>
  );
}
