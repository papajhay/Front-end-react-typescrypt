import React from 'react';
import { Box, Typography } from '@mui/material';
import { ScaleLoader } from 'react-spinners';
import { useIntl } from 'react-intl';

const LoadingSpinner: React.FC = () => {
  const intl = useIntl();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {intl.formatMessage({ id: 'spinner.loading' })}
      </Typography>
      <ScaleLoader color="#ff1d5e" loading={true} />
    </Box>
  );
};

export default LoadingSpinner;