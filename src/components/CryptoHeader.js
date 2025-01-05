import React from 'react';
import { Typography, Container } from '@mui/material';

function CryptoHeader() {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', padding: '2rem' }}>
    
      <Typography variant="h3" gutterBottom>
        YOUR CRYPTO, YOUR CONTROL
      </Typography>

     
      <Typography variant="h5" color="textSecondary" gutterBottom>
        A Secure Vault for Your Digital Wealth
      </Typography>

     
      <Typography variant="body1" paragraph>
        Invest in the new era of money and redefine how you manage your wealth. 
        Whether you're a beginner or an expert, our platform makes crypto simple for everyone. 
        Experience the revolution of blockchain technology today.
      </Typography>

      <Typography variant="body1" paragraph>
        Take charge of your financial future with unmatched security and ease. 
        Download the app and explore the world of crypto now—your digital wealth is just a click away.
      </Typography>

      <Typography variant="body1" paragraph>
        Join a global community and connect with the ever-evolving crypto ecosystem. 
        Secure your future, take control, and explore endless possibilities with us.
      </Typography>
    </Container>
  );
}

export default CryptoHeader;
