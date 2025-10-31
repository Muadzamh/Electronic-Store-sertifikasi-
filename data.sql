-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2025 at 02:53 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `electronic_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `nama`, `email`, `password`, `created_at`, `updated_at`) VALUES
(3, 'admin3', 'admin3@gmail.com', '$2b$10$SnZO0QJHojq/zIPY4LnZIuhH5okaVa8TgHOIeUNfS3bocOOJoGsI6', '2025-10-31 11:27:02', '2025-10-31 11:27:02'),
(4, 'admin4', 'admin4@admin.com', '$2b$10$D5W2iEKptlTizTvUjY30WexnxxYxNOel7ZyrilFYD7mwbjFzUnFrm', '2025-10-31 13:15:43', '2025-10-31 13:15:43');

-- --------------------------------------------------------

--
-- Table structure for table `data_penjualan`
--

CREATE TABLE `data_penjualan` (
  `id` int(11) NOT NULL,
  `kategori` varchar(100) NOT NULL,
  `bulan` varchar(20) NOT NULL,
  `pendapatan` decimal(15,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_penjualan`
--

INSERT INTO `data_penjualan` (`id`, `kategori`, `bulan`, `pendapatan`, `created_at`, `updated_at`) VALUES
(1, 'Iphone', 'Januari', 36000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(2, 'Iphone', 'Februari', 24000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(3, 'Iphone', 'Maret', 48000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(4, 'Iphone', 'April', 36000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(5, 'Iphone', 'Mei', 60000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(6, 'Iphone', 'Juni', 48000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(7, 'Iphone', 'Juli', 72000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(8, 'Iphone', 'Agustus', 60000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(9, 'Iphone', 'September', 48000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(10, 'Iphone', 'Oktober', 84000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(11, 'Iphone', 'November', 96000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(12, 'Iphone', 'Desember', 120000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(13, 'Samsung', 'Januari', 60000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(14, 'Samsung', 'Februari', 40000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(15, 'Samsung', 'Maret', 80000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(16, 'Samsung', 'April', 60000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(17, 'Samsung', 'Mei', 100000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(18, 'Samsung', 'Juni', 80000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(19, 'Samsung', 'Juli', 120000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(20, 'Samsung', 'Agustus', 100000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(21, 'Samsung', 'September', 80000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(22, 'Samsung', 'Oktober', 140000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(23, 'Samsung', 'November', 160000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(24, 'Samsung', 'Desember', 200000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(25, 'Xiaomi', 'Januari', 9600000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(26, 'Xiaomi', 'Februari', 6400000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(27, 'Xiaomi', 'Maret', 12800000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(28, 'Xiaomi', 'April', 9600000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(29, 'Xiaomi', 'Mei', 16000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(30, 'Xiaomi', 'Juni', 12800000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(31, 'Xiaomi', 'Juli', 19200000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(32, 'Xiaomi', 'Agustus', 16000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(33, 'Xiaomi', 'September', 12800000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(34, 'Xiaomi', 'Oktober', 22400000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(35, 'Xiaomi', 'November', 25600000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24'),
(36, 'Xiaomi', 'Desember', 32000000.00, '2025-10-30 18:06:24', '2025-10-30 18:06:24');

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id` int(11) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `kategori` varchar(100) NOT NULL,
  `produk` varchar(255) NOT NULL,
  `harga` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id`, `thumbnail`, `kategori`, `produk`, `harga`, `created_at`, `updated_at`) VALUES
(1, '/uploads/produk/produk-1761913476358-132993411.jpg', 'Iphone', 'Iphone 13 Pro', 12000000.00, '2025-10-30 16:36:46', '2025-10-31 12:24:36'),
(2, '/uploads/produk/produk-1761913483077-479364329.jpg', 'Samsung', 'Samsung X flip', 20000000.00, '2025-10-30 16:36:46', '2025-10-31 12:24:43'),
(3, '/uploads/produk/produk-1761913497429-414175296.jpg', 'Xiaomi', 'Xiaomi Redmi Note 11 Pro', 3200000.00, '2025-10-30 16:36:46', '2025-10-31 12:24:57'),
(8, '/uploads/produk/produk-1761913467073-161920402.jpg', 'Iphone', 'Iphone 13 Pro', 12000000.00, '2025-10-31 12:24:04', '2025-10-31 12:29:54'),
(9, '/uploads/produk/produk-1761913533833-723369558.jpeg', 'Oppo', 'Oppo Reno 4', 7000000.00, '2025-10-31 12:25:33', '2025-10-31 12:30:21'),
(10, '/uploads/produk/produk-1761916356557-832371906.jpg', 'Samsung', 'Samsung S9+', 10000000.00, '2025-10-31 13:12:36', '2025-10-31 13:12:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `data_penjualan`
--
ALTER TABLE `data_penjualan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `data_penjualan`
--
ALTER TABLE `data_penjualan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
