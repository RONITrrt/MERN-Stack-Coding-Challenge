import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TransactionTable from './components/TransactionTable/TransactionTable';
import Statistics from './components/Statistics/Statistics';
import PriceRangeChart from './components/Charts/BarChart';
import CategoryPieChart from './components/Charts/PieChart';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function App() {
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  // Temporary mock data for development
  const mockData = {
    transactions: Array(10).fill().map((_, idx) => ({
      id: idx,
      title: `Product ${idx}`,
      description: `Description ${idx}`,
      price: Math.random() * 1000,
      category: `Category ${idx % 3}`,
      sold: idx % 2 === 0,
      dateOfSale: new Date().toISOString()
    })),
    statistics: {
      totalSaleAmount: 15000,
      totalSoldItems: 50,
      totalNotSoldItems: 30
    },
    barChartData: [
      { range: '0-100', count: 10 },
      { range: '101-200', count: 20 },
      { range: '201-300', count: 15 },
      { range: '301-400', count: 8 },
      { range: '401-500', count: 5 }
    ],
    pieChartData: [
      { name: 'Electronics', value: 30 },
      { name: 'Clothing', value: 20 },
      { name: 'Books', value: 15 },
      { name: 'Home', value: 25 }
    ]
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" gap={2}>
            <TextField
              select
              label="Select Month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              {months.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Search transactions"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Statistics stats={mockData.statistics} />
        </Grid>

        <Grid item xs={12} md={6}>
          <PriceRangeChart data={mockData.barChartData} />
        </Grid>

        <Grid item xs={12} md={6}>
          <CategoryPieChart data={mockData.pieChartData} />
        </Grid>

        <Grid item xs={12}>
          <TransactionTable
            transactions={mockData.transactions}
            page={page}
            rowsPerPage={rowsPerPage}
            totalCount={100}
            handleChangePage={handleChangePage}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;