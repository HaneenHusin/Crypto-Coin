import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import CoinsList from '../components/CoinList';
import TotalValue from '../components/TotalValue';
import { fetchCoins, editCoin, deleteCoin } from '../utils/apiService';

const CoinsPage = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCoins = async () => {
    setLoading(true); 
    try {
      const coinsData = await fetchCoins();
      setCoins(coinsData);
    } catch (error) {
      console.error('Failed to fetch coins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCoin = async (id, updatedCoin) => {
    try {
      await editCoin(id, updatedCoin);
      getCoins();
    } catch (error) {
      console.error('Failed to edit coin:', error);
    }
  };

  const handleDeleteCoin = async (id) => {
    try {
      await deleteCoin(id);
      getCoins();
    } catch (error) {
      console.error('Failed to delete coin:', error);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Container maxWidth="md" style={{ textAlign: 'center', padding: '2rem' }}>
        <Typography variant="h3" gutterBottom>
          CONNECTING THE CRYPTO WORLD
        </Typography>
        <TotalValue />
      </Container>
      <CoinsList coins={coins} onEdit={handleEditCoin} onDelete={handleDeleteCoin} />
    </Container>
  );
};

export default CoinsPage;
