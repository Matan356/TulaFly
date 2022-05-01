import React, {  useContext, useState } from "react"; 
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "./auth-context";
import Context from "./context";

const UserContext = (props) => {
  const { sendRequest } = useHttpClient();
  const [userCartId, setUserCartId] = useState([])
  const [userVacations, setUserVacations] = useState([]);
  const auth = useContext(AuthContext);
  const [fetching, setFetching] = useState(true);

    const fetchCartVacations = async () => {
      if(!auth.userId) return null
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}cart/${auth.userId}`
          );
          setUserCartId(responseData.userCart);
        } catch (err) {}
        setFetching(false);
    };

  const fetchVacations = async () => {
    if(!auth.userId) return null
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}main/${auth.userId}`
      );
      setUserVacations(responseData.userVacations);
      setFetching(false);
    } catch (err) {}
  };

  return (
    <Context.Provider
      value={{
        fetchVacations,
        userVacations,
        fetchCartVacations,
        userCartId,
        fetching,
      }}
    >{props.children}</Context.Provider>
  );
};

export default UserContext;
