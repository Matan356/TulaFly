import { Container, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserAvatar from "../../user/components/UserAvatar";
import VacationsList from "../components/VacationsList";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import { AuthContext } from "../../shared/context/auth-context";
import { socket } from "../../shared/context/socket";
import { useVacationsContext } from "../../shared/context/VacationsContext";

const AllVacations = () => {
  const auth = useContext(AuthContext);
  const { status, vacations, fetchAllVacations } = useVacationsContext();
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (active) {
      fetchAllVacations();
    }
    socket.on("add", () => fetchAllVacations());
    socket.on("delete", () => fetchAllVacations());
    socket.on("update", () => fetchAllVacations());
      setActive(false);
  }, [active,fetchAllVacations]);
  return (
    <>
      { !status && (
        <div>
          <BackDrop open>
            <LoadingSpiner />
          </BackDrop>
        </div>
      )}
      <Container sx={{ mt: "10rem", mb: "8rem", minWidth: "100%" }}>
        {auth.isLoggedIn && <UserAvatar />}
        <Grid container display="flex" justifyContent="center">
          <VacationsList loadedVacations={vacations} userId={auth.userId} />
        </Grid>
      </Container>
    </>
  );
};

export default AllVacations;
