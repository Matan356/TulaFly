import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserAvatar = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [userDet, setUserDet] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      const res = loadedUsers.find((x) => x.id === user.userId);
      setUserDet(res);
    }
  }, [loadedUsers]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}main/users`
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      
      {isLoading && (
        <div>
          <BackDrop open>
            <LoadingSpiner />
          </BackDrop>
        </div>
      )}
      {!isLoading && userDet && (
        <Typography
          fontFamily="'Questrial', sans-serif"
          color="#346eeb"
          variant="h1"
          ml={{ xs: 12, xl: 78, md: 45 }}
          fontSize={{ xs: 30, xl: 45, md: 40 }}
        >
          Hello {userDet.userName}!
        </Typography>
      )}
    </>
  );
};
export default UserAvatar;
