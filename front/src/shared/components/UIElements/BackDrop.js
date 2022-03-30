import { Backdrop } from '@mui/material';
import React, { useState } from 'react'
import LoadingSpiner from './LoadingSpiner';




const BackDrop = (props) => {
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
      setOpen(!open);
    };

    return (
      <div>
      
        <Backdrop sx={{ zIndex:"3",
      color: '#fff',}}open={props.open} onClick={handleToggle}>
         {props.children}
        </Backdrop>
      </div>
    );
  }

export default BackDrop