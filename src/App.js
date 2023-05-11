import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";

import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <AppLayout />
      </Router>
    </RecoilRoot>
  );
}

export default App;
