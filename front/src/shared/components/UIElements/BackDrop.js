import { Backdrop } from '@mui/material';
import React from 'react'




const BackDrop = (props) => {
    return (
      <div>
        <Backdrop sx={{ zIndex:"3",
      color: '#fff',}}open={props.open} onClick={props.onCancel}>
         {props.children}
        </Backdrop>
      </div>
    );
  }

export default BackDrop