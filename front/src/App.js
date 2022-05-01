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
import Checkout from "./cart/pages/Checkout";
import DashBoard from './admin/pages/DashBoard'
import Users from "./user/pages/Users";
import AddVacation from "./vacations/pages/AddVacation";
import UserContext from './shared/context/UserContext'

function App() {
  const { token, login, logout, userId, isAdmin } = useAuth();
  let routes;
  if (token&& isAdmin) {
    routes = (
      <>
        <Route path="/" element={<AllVacations />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/addVacation" element={<AddVacation />}></Route>
      </>
    );
  } else if (token) {
    routes = (
      <>
        <Route path="/" element={<AllVacations />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/cart" element={<UserCart />}></Route>
        <Route path="/pay" element={<Checkout />}></Route>
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
          isAdmin: isAdmin,
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
            <UserContext>
            <Routes>{routes}</Routes>
              </UserContext>
          </Suspense>
        </main>
      </AuthContext.Provider>
    </>
  );
}

export default App;
