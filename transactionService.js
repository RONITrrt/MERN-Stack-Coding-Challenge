const dataService = require('./dataService');

class TransactionService {
  async listTransactions(month, search = '', page = 1, perPage = 10) {
    const data = await dataService.getData();
    let filteredData = dataService.filterByMonth(data, month);

    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.price.toString().includes(search)
      );
    }

    const total = filteredData.length;
    const start = (page - 1) * perPage;
    const transactions = filteredData.slice(start, start + perPage);

    return {
      transactions,
      pagination: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage)
      }
    };
  }

  async getStatistics(month) {
    const data = await dataService.getData();
    const monthData = dataService.filterByMonth(data, month);

    return {
      totalSaleAmount: monthData.reduce((sum, item) => sum + item.price, 0),
      totalSoldItems: monthData.filter(item => item.sold).length,
      totalNotSoldItems: monthData.filter(item => !item.sold).length
    };
  }

  async getBarChartData(month) {
    const data = await dataService.getData();
    const monthData = dataService.filterByMonth(data, month);

    const ranges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity }
    ];

    return ranges.map(({ min, max }) => ({
      range: `${min}-${max === Infinity ? 'above' : max}`,
      count: monthData.filter(item => 
        item.price >= min && item.price < (max === Infinity ? Number.MAX_VALUE : max)
      ).length
    }));
  }

  async getPieChartData(month) {
    const data = await dataService.getData();
    const monthData = dataService.filterByMonth(data, month);

    const categoryCount = monthData.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count
    }));
  }

  async getCombinedData(month) {
    const [statistics, barChart, pieChart] = await Promise.all([
      this.getStatistics(month),
      this.getBarChartData(month),
      this.getPieChartData(month)
    ]);

    return {
      statistics,
      barChart,
      pieChart
    };
  }
}

module.exports = new TransactionService();