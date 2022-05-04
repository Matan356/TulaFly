import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { useAuth } from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/auth-context";
import LoadingSpiner from "./shared/components/UIElements/LoadingSpiner";
import UserContext from "./shared/context/UserContext";
import { socket, SocketContext } from "./shared/context/socket";

const AllVacations = React.lazy(() => import("./vacations/pages/AllVacations"));
const DashBoard = React.lazy(() => import("./admin/pages/DashBoard"));
const Users = React.lazy(() => import("./user/pages/Users"));
const AddVacation = React.lazy(() => import("./vacations/pages/AddVacation"));
const Auth = React.lazy(() => import("./user/pages/Auth"));
const About = React.lazy(() => import("./shared/components/Navigation/About"));
const UserCart = React.lazy(() => import("./cart/pages/UserCart"));
const Checkout = React.lazy(() => import("./cart/pages/Checkout"));

function App() {
  const { token, login, logout, userId, isAdmin } = useAuth();
  let routes;
  if (token && isAdmin) {
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
        <SocketContext.Provider value={socket}>
        <UserContext>
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
        </UserContext>
        </SocketContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
