import { CircularProgress } from '@mui/material'
import React from 'react'

const LoadingSpiner = () => {
  return (
    <div> <CircularProgress sx={{alignContent:"center"}} color="inherit" /></div>
  )
}

export default LoadingSpiner