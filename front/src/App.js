import React from "react";
import { Route, Routes } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import AllVacations from "./vacations/pages/AllVacations";
import About from './shared/components/Navigation/About'
import Auth from './user/pages/Auth'

function App() {
  let routes;
  routes = (<>
  <Route path="/" element={<AllVacations/>}></Route>
  <Route path="/auth" element={<Auth  />} ></Route>
  <Route path="/about" element={<About  />} ></Route>
  </>)

  return (
    <div className="App">
      <MainNavigation />
      <main style={{marginTop:'6%'}}>
        <Routes>{routes}</Routes>
      </main>
    </div>
  );
}

export default App;
 