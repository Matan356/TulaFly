import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validatores";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPhoto from "../../assets/pexels-igor-fedoriv-1260991.jpg";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const theme = createTheme();

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}main/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
        console.log("logged in");
        navigate("/");
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}main/signup`,
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            lastName: formState.inputs.lastName.value,
            userName: formState.inputs.userName.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
        navigate("/");
      } catch (err) {}
    }
  };

  return (
    
    <>
     {error && <ErrorModal error={error} onClear={clearError} />}
    {isLoading && (<div>
        <BackDrop  open ><LoadingSpiner/></BackDrop>
      </div>)}
      <ThemeProvider theme={theme}>
        <Grid container component="main">
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${LoginPhoto})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                height:"100vh",
                my: 13,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 3, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {isLoginMode ? "LOGIN" : "SIGNUP"}
              </Typography>
              <Box component="form" onSubmit={authSubmitHandler} sx={{ mt: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  inverse
                  onClick={switchModeHandler}
                >
                  SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
                </Button>
                {!isLoginMode && (
                  <>
                    <Input
                      element="input"
                      id="name"
                      type="text"
                      label="Your Name"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter a name."
                      onInput={inputHandler}
                    />
                    <Input
                      element="input"
                      id="userName"
                      type="text"
                      label="Your User Name"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter a user name."
                      onInput={inputHandler}
                    />
                    <Input
                      element="input"
                      id="lastName"
                      type="text"
                      label="Your Last Name"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter a last name."
                      onInput={inputHandler}
                    />
                  </>
                )}
                <>
                  <Input
                    element="input"
                    id="email"
                    type="email"
                    label="Email Address"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                  />
                  <Input
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a valid password, at least 6 characters."
                    onInput={inputHandler}
                  />
                </>

                <Button
                  sx={{ mt: 3, mb: 8 }}
                  type="submit"
                  onSubmit={authSubmitHandler}
                  fullWidth
                  variant="contained"
                  disabled={!formState.isValid}
                >
                  {isLoginMode ? "LOGIN" : "SIGNUP"}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Auth;
