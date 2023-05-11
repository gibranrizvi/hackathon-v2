import React from "react";

import Header from "./Header";

import BottomNavBar from "./BottomNavBar";

function RootLayout({ children }) {
  return (
    <div className="flex flex-col h-12">
      <div className="h-12" />
      <Header />
      {children}
      <BottomNavBar />
    </div>
  );
}

export default RootLayout;
