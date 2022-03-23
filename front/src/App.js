import React from "react";
import { Route, Routes } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import AllVacations from "./vacations/pages/AllVacations";
import About from "./shared/components/Navigation/About";
import Auth from "./user/pages/Auth";
import { useAuth } from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  routes = (
    <>
      <Route path="/" element={<AllVacations />}></Route>
      <Route path="/auth" element={<Auth />}></Route>
      <Route path="/about" element={<About />}></Route>
    </>
  );

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <MainNavigation />
        <main style={{ marginTop: "6%" }}>
          <Routes>{routes}</Routes>
        </main>
      </AuthContext.Provider>
    </>
  );
}

export default App;
