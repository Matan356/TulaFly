import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import AllVacations from "./vacations/pages/AllVacations";
import About from "./shared/components/Navigation/About";
import Auth from "./user/pages/Auth";
import { useAuth } from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/auth-context";
import LoadingSpiner from "./shared/components/UIElements/LoadingSpiner";
import UserCart from "./cart/pages/UserCart";

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <>
        <Route path="/" element={<AllVacations />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/cart" element={<UserCart />}></Route>
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<AllVacations />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/about" element={<About />}></Route>
      </>
    );
  }

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
          <Suspense
            fallback={
              <div>
                <LoadingSpiner />
              </div>
            }
          >
            <Routes>{routes}</Routes>
          </Suspense>
        </main>
      </AuthContext.Provider>
    </>
  );
}

export default App;
