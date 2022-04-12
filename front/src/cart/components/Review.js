import React, { useEffect, useState } from "react";
import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useHttpClient } from "../../shared/hooks/http-hook";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";

const Review = (props) => {
  const [existUser, setExistUser] = useState({});
  const [loadedVacations, setLoadedVacations] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();
  const [userVacationsId, setUserVacationsId] = useState([]);

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}main`
        );
        setLoadedVacations(responseData.vacation);
      } catch (err) {}
    };
    fetchVacations();
  }, [sendRequest]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setExistUser(user);
    }
  }, []);

  useEffect(() => {
    const fetchVacations = async () => {
      if (existUser.userId) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}cart/${existUser.userId}`
          );
          setUserVacationsId(responseData.userCart);
        } catch (err) {}
      }
    };
    fetchVacations();
  }, [sendRequest, existUser]);

  const userVacations = loadedVacations.filter(({ _id }) =>
    userVacationsId.includes(_id)
  );

  return (
    <React.Fragment>
      {isLoading && (
        <div>
          <BackDrop open>
            <LoadingSpiner />
          </BackDrop>
        </div>
      )}
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {!isLoading &&
          loadedVacations &&
          userVacations.map((vacation) => (
            <ListItem key={vacation._id} sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={vacation.target}
                secondary={vacation.description}
              />
              <Typography variant="body2">{vacation.price}</Typography>
            </ListItem>
          ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {userVacations.reduce((sum, i) => (sum += i.price), 0)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {props.formAddressCallBack.firstName}{" "}
            {props.formAddressCallBack.lastName}
          </Typography>
          <Typography gutterBottom>
            {props.formAddressCallBack.address1},
            {props.formAddressCallBack.city},{props.formAddressCallBack.state},
          </Typography>{" "}
          <Typography gutterBottom>
            {props.formAddressCallBack.zip},{props.formAddressCallBack.country}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {props.formpaymentCallBack.cardName}
                </Typography>
                <Typography gutterBottom>
                  {" "}
                  {props.formpaymentCallBack.cardNumber}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {props.formpaymentCallBack.expDate}
                </Typography>{" "}
                <Typography>{props.formpaymentCallBack.cvv}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
