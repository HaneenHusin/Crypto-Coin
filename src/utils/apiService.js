import axios from 'axios';
import { API_BASE_URL } from "./constants";
export const axiosInstance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/', 
  headers: {
    'accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'x-cg-demo-api-key': 'CG-UpUDgPbX2ZqJRN7ipFmYLTAb'
  }
});
export const fetchCoins = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching coins:', error);
    throw error;
  }
};
export const addCoin = async (coin) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/coins`, coin);
    return response.data;
  } catch (error) {
    console.error('Error adding coin:', error);
    throw error;
  }
};
export const editCoin = async (id, updatedCoin) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/coins/${id}`, updatedCoin);
    return response.data; 
  } catch (error) {
    console.error('Error editing coin:', error);
    throw error;
  }
};

export const deleteCoin = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/coins/${id}`);
  } catch (error) {
    console.error('Error deleting coin:', error);
    throw error;
  }
};

export const fetchTotalValue = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/portfolio/total-value`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching total value:', error);
    throw error;
  }
};
