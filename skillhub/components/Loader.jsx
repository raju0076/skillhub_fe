import React from "react";
export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
    </div>
  );
}
