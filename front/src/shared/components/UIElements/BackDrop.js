import { Backdrop } from '@mui/material';
import React from 'react'
import ReactDOM from 'react-dom';





const BackDrop = (props) => {
    const content = (
      <div>
        <Backdrop sx={{ zIndex:"3",
      color: '#fff',}}open={props.open} onClick={props.onCancel}>
         {props.children}
        </Backdrop>
      </div>
    );
    return ReactDOM.createPortal(content, document.getElementById('backdrop-hook'));

  }

export default BackDrop