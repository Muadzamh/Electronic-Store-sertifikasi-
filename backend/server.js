const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const authRoutes = require('./routes/auth');
const produkRoutes = require('./routes/produk');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', authRoutes);
app.use('/api/produk', produkRoutes);
app.use('/api', dashboardRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
