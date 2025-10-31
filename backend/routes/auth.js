const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db');

router.post('/register', async (req, res) => {
    const { nama, email, password } = req.body;
    
    const checkQuery = 'SELECT * FROM admin WHERE email = ?';
    
    db.query(checkQuery, [email], async (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            res.status(500).json({ error: 'Registration failed' });
            return;
        }
        
        if (results.length > 0) {
            res.status(400).json({ error: 'Email sudah terdaftar' });
            return;
        }
        
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            const insertQuery = `
                INSERT INTO admin (nama, email, password, created_at, updated_at)
                VALUES (?, ?, ?, NOW(), NOW())
            `;
            
            db.query(insertQuery, [nama, email, hashedPassword], (err, results) => {
                if (err) {
                    console.error('Error creating admin:', err);
                    res.status(500).json({ error: 'Registration failed' });
                    return;
                }
                
                res.json({ 
                    message: 'Registration successful',
                    admin: {
                        id: results.insertId,
                        nama,
                        email
                    }
                });
            });
        } catch (error) {
            console.error('Error hashing password:', error);
            res.status(500).json({ error: 'Registration failed' });
        }
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    const query = 'SELECT * FROM admin WHERE email = ?';
    
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).json({ error: 'Login failed' });
            return;
        }
        
        if (results.length === 0) {
            res.status(401).json({ error: 'Email atau password salah' });
            return;
        }
        
        const admin = results[0];
        
        try {
            const isPasswordMatch = await bcrypt.compare(password, admin.password);
            
            if (!isPasswordMatch) {
                res.status(401).json({ error: 'Email atau password salah' });
                return;
            }
            
            res.json({ 
                message: 'Login successful',
                admin: {
                    id: admin.id,
                    nama: admin.nama,
                    email: admin.email
                }
            });
        } catch (error) {
            console.error('Error comparing password:', error);
            res.status(500).json({ error: 'Login failed' });
        }
    });
});

module.exports = router;
