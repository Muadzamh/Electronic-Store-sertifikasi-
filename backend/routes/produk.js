const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/produk';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'produk-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

router.get('/', (req, res) => {
    const query = 'SELECT * FROM produk ORDER BY id ASC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: 'Failed to fetch products' });
            return;
        }
        res.json(results);
    });
});

router.post('/', upload.single('thumbnail'), (req, res) => {
    const { produk, kategori, harga } = req.body;
    const thumbnail = req.file ? `/uploads/produk/${req.file.filename}` : 'Link Gambar';
    
    const query = `
        INSERT INTO produk (thumbnail, produk, kategori, harga, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
    
    db.query(query, [thumbnail, produk, kategori, harga], (err, results) => {
        if (err) {
            console.error('Error creating product:', err);
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(500).json({ error: 'Failed to create product' });
            return;
        }
        res.json({ 
            message: 'Product created successfully', 
            id: results.insertId,
            thumbnail: thumbnail
        });
    });
});

router.put('/:id', upload.single('thumbnail'), (req, res) => {
    const { id } = req.params;
    const { produk, kategori, harga } = req.body;
    
    const getOldQuery = 'SELECT thumbnail FROM produk WHERE id = ?';
    
    db.query(getOldQuery, [id], (err, results) => {
        if (err) {
            console.error('Error fetching old product:', err);
            if (req.file) fs.unlinkSync(req.file.path);
            res.status(500).json({ error: 'Failed to update product' });
            return;
        }
        
        if (results.length === 0) {
            if (req.file) fs.unlinkSync(req.file.path);
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        
        const oldThumbnail = results[0].thumbnail;
        const thumbnail = req.file ? `/uploads/produk/${req.file.filename}` : oldThumbnail;
        
        const query = `
            UPDATE produk 
            SET thumbnail = ?, produk = ?, kategori = ?, harga = ?, updated_at = NOW()
            WHERE id = ?
        `;
        
        db.query(query, [thumbnail, produk, kategori, harga, id], (err, results) => {
            if (err) {
                console.error('Error updating product:', err);
                if (req.file) fs.unlinkSync(req.file.path);
                res.status(500).json({ error: 'Failed to update product' });
                return;
            }
            
            if (req.file && oldThumbnail && oldThumbnail !== 'Link Gambar' && oldThumbnail.startsWith('/uploads')) {
                const oldPath = path.join(__dirname, '..', oldThumbnail);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            
            res.json({ 
                message: 'Product updated successfully', 
                id,
                thumbnail: thumbnail
            });
        });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    const getQuery = 'SELECT thumbnail FROM produk WHERE id = ?';
    
    db.query(getQuery, [id], (err, results) => {
        if (err) {
            console.error('Error fetching product:', err);
            res.status(500).json({ error: 'Failed to delete product' });
            return;
        }
        
        if (results.length === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        
        const thumbnail = results[0].thumbnail;
        const deleteQuery = 'DELETE FROM produk WHERE id = ?';
        
        db.query(deleteQuery, [id], (err, results) => {
            if (err) {
                console.error('Error deleting product:', err);
                res.status(500).json({ error: 'Failed to delete product' });
                return;
            }
            
            if (thumbnail && thumbnail !== 'Link Gambar' && thumbnail.startsWith('/uploads')) {
                const imagePath = path.join(__dirname, '..', thumbnail);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            
            res.json({ message: 'Product deleted successfully', id });
        });
    });
});

module.exports = router;
