import React, { useEffect, useState } from "react";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import UsersList from "../components/UsersList";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();

  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    let active = true;
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}main/users`
        );
        if (active) {
          setLoadedUsers(responseData.users);
        }
      } catch (err) {}
    };
    fetchUsers();
    return () => {
      active = false;
    };
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
      {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
    </>
  );
};

export default Users;
