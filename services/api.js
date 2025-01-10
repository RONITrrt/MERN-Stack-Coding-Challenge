import axios from 'axios';

const API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

const api = {
  async getData() {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this returns the correct data
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
};

export default api;
