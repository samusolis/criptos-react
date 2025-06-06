import React from 'react';
import { Alert } from '@mui/material';

const Error = ({ children }) => {
  return (
    <Alert
      severity="error"
      sx={{
        backgroundColor: '#2d0000',  
        color: '#fff',               
        borderRadius: '4px',
        '& .MuiAlert-icon': {
          color: '#ff4c4c'           
        }
      }}
    >
      {children}
    </Alert>
  );
};

export default Error;
