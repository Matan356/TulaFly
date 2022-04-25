import { Typography } from "@mui/material";
import React from "react";

const Title = (props)=> {
    return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.children}
      </Typography>
    );
  }
  
  export default Title;