const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/data-penjualan', (req, res) => {
    const query = `
        SELECT bulan, SUM(pendapatan) as total_pendapatan 
        FROM data_penjualan 
        GROUP BY bulan 
        ORDER BY FIELD(bulan, 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember')
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching sales data:', err);
            res.status(500).json({ error: 'Failed to fetch sales data' });
            return;
        }
        res.json(results);
    });
});

router.get('/revenue-by-product', (req, res) => {
    const query = `
        SELECT kategori, COUNT(*) as total_produk
        FROM produk 
        GROUP BY kategori
        ORDER BY kategori
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching revenue data:', err);
            res.status(500).json({ error: 'Failed to fetch revenue data' });
            return;
        }
        console.log('Revenue data:', results);
        res.json(results);
    });
});

router.get('/dashboard-summary', (req, res) => {
    const queries = {
        monthlyEarnings: `
            SELECT SUM(pendapatan) as total 
            FROM data_penjualan 
            WHERE bulan = 'Oktober'
        `,
        annualEarnings: `
            SELECT SUM(pendapatan) as total 
            FROM data_penjualan
        `,
        totalProducts: `
            SELECT COUNT(*) as total 
            FROM produk
        `
    };

    const monthlyPromise = new Promise((resolve, reject) => {
        db.query(queries.monthlyEarnings, (err, results) => {
            if (err) reject(err);
            else resolve(results[0].total || 0);
        });
    });

    const annualPromise = new Promise((resolve, reject) => {
        db.query(queries.annualEarnings, (err, results) => {
            if (err) reject(err);
            else resolve(results[0].total || 0);
        });
    });

    const productsPromise = new Promise((resolve, reject) => {
        db.query(queries.totalProducts, (err, results) => {
            if (err) reject(err);
            else resolve(results[0].total || 0);
        });
    });

    Promise.all([monthlyPromise, annualPromise, productsPromise])
        .then(([monthly, annual, products]) => {
            res.json({
                monthlyEarnings: monthly,
                annualEarnings: annual,
                totalProducts: products,
                tasks: 50,
                pendingRequests: 18
            });
        })
        .catch(err => {
            console.error('Error fetching dashboard summary:', err);
            res.status(500).json({ error: 'Failed to fetch dashboard summary' });
        });
});

module.exports = router;
