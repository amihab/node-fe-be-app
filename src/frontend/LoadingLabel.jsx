import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const LoadingLabel = ({ text }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress color="primary" size={24} />
      <Typography variant="body1" color="textSecondary" style={{ marginLeft: '8px' }}>
        {text}
      </Typography>
    </Box>
  );
};

export default LoadingLabel;
