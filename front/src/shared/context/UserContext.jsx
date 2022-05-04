import React, {  useContext, useState } from "react"; 
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "./auth-context";
import Context from "./context";

const UserContext = (props) => {
  const { sendRequest } = useHttpClient();
  const [cartVacations, setCartVacations] = useState([])
  const [userVacations, setUserVacations] = useState([]);
  const auth = useContext(AuthContext);

    const fetchCartVacations = async () => {
      if(!auth.userId) return null
      if(!auth.isAdmin) return null
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}cart/${auth.userId}`
          );
          setCartVacations(responseData.userCart);
        } catch (err) {}
    };

  const fetchUserVacations = async () => {
    if(!auth.userId) return null
    if(!auth.isAdmin) return null
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}main/${auth.userId}`
      );
      setUserVacations(responseData.userVacations);
    } catch (err) {}
  };

  return (
    <Context.Provider
      value={{
        fetchUserVacations,
        userVacations,
        fetchCartVacations,
        cartVacations,
      }}
    >{props.children}</Context.Provider>
  );
};

export default UserContext;
