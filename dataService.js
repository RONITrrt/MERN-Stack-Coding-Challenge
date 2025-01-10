const axios = require('axios');

class DataService {
  constructor() {
    this.data = null;
    this.lastFetch = null;
    this.API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
  }

  // Fetch data from the external API
  async fetchData() {
    try {
      const response = await axios.get(this.API_URL);
      this.data = response.data.map(item => ({
        ...item,
        dateOfSale: new Date(item.dateOfSale)
      }));
      this.lastFetch = new Date();
      return this.data;
    } catch (error) {
      throw new Error('Failed to fetch data from API: ' + error.message);
    }
  }

  // Return data if it's cached or fetch fresh data
  async getData() {
    if (!this.data || !this.lastFetch || new Date() - this.lastFetch > 3600000) {
      await this.fetchData();
    }
    return this.data;
  }

  // Additional utility method to filter data by month
  filterByMonth(data, month) {
    return data.filter(item => item.dateOfSale.getMonth() + 1 === month);
  }
}

module.exports = new DataService();
