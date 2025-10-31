import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Produk = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/produk');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleAdd = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Tambah Produk Baru',
      width: '500px',
      html:
        `<div class="text-left" style="padding: 0 10px;">
          <label class="block mb-3">
            <span class="text-gray-700 font-medium text-sm">Upload Gambar</span>
            <input id="swal-image" type="file" accept="image/*" 
              style="width: 100%; margin-top: 5px; padding: 8px; font-size: 13px; border: 1px solid #d1d5db; border-radius: 6px;"
              class="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
          </label>
          <label class="block mb-3">
            <span class="text-gray-700 font-medium text-sm">Nama Produk</span>
            <input id="swal-produk" 
              style="width: 100%; margin-top: 5px; padding: 10px; font-size: 14px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;"
              placeholder="Nama Produk">
          </label>
          <label class="block mb-3">
            <span class="text-gray-700 font-medium text-sm">Kategori</span>
            <input id="swal-kategori" 
              style="width: 100%; margin-top: 5px; padding: 10px; font-size: 14px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;"
              placeholder="Kategori">
          </label>
          <label class="block mb-3">
            <span class="text-gray-700 font-medium text-sm">Harga</span>
            <input id="swal-harga" type="number" 
              style="width: 100%; margin-top: 5px; padding: 10px; font-size: 14px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;"
              placeholder="Harga">
          </label>
        </div>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Tambah',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      customClass: {
        popup: 'swal-popup-custom'
      },
      preConfirm: () => {
        const imageFile = document.getElementById('swal-image').files[0];
        const produk = document.getElementById('swal-produk').value;
        const kategori = document.getElementById('swal-kategori').value;
        const harga = document.getElementById('swal-harga').value;

        if (!produk || !kategori || !harga) {
          Swal.showValidationMessage('Nama Produk, Kategori, dan Harga harus diisi!');
          return false;
        }

        return { 
          imageFile,
          produk, 
          kategori, 
          harga: parseFloat(harga) 
        };
      }
    });

    if (formValues) {
      try {
        const formData = new FormData();
        if (formValues.imageFile) {
          formData.append('thumbnail', formValues.imageFile);
        }
        formData.append('produk', formValues.produk);
        formData.append('kategori', formValues.kategori);
        formData.append('harga', formValues.harga);

        await axios.post('http://localhost:5000/api/produk', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Produk berhasil ditambahkan',
          confirmButtonColor: '#2563eb',
        });
        
        fetchProducts();
      } catch (error) {
        console.error('Error adding product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: error.response?.data?.error || 'Gagal menambahkan produk',
          confirmButtonColor: '#dc2626',
        });
      }
    }
  };

  const handleEdit = async (product) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Produk',
      width: '500px',
      html:
        `<div class="text-left" style="padding: 0 10px;">
          <label class="block mb-3">
            <span class="text-gray-700 font-medium text-sm">Upload Gambar Baru (opsional)</span>
            <input id="swal-image" type="file" accept="image/*" 
              style="width: 100%; margin-top: 5px; padding: 8px; font-size: 13px; border: 1px solid #d1d5db; border-radius: 6px;"
              class="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
            <span style="font-size: 11px; color: #6b7280; display: block; margin-top: 5px;">Kosongkan jika tidak ingin mengubah gambar</span>
          </label>
          <label class="block mb-3">
            <span class="text-gray-700 font-medium text-sm">Nama Produk</span>
            <input id="swal-produk" value="${product.produk}"
              style="width: 100%; margin-top: 5px; padding: 10px; font-size: 14px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;"
              placeholder="Nama Produk">
          </label>
          <label class="block mb-3">
            <span class="text-gray-700 font-medium text-sm">Kategori</span>
            <input id="swal-kategori" value="${product.kategori}"
              style="width: 100%; margin-top: 5px; padding: 10px; font-size: 14px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;"
              placeholder="Kategori">
          </label>
          <label class="block mb-3">
            <span class="text-gray-700 font-medium text-sm">Harga</span>
            <input id="swal-harga" type="number" value="${product.harga}"
              style="width: 100%; margin-top: 5px; padding: 10px; font-size: 14px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;"
              placeholder="Harga">
          </label>
        </div>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      customClass: {
        popup: 'swal-popup-custom'
      },
      preConfirm: () => {
        const imageFile = document.getElementById('swal-image').files[0];
        const produk = document.getElementById('swal-produk').value;
        const kategori = document.getElementById('swal-kategori').value;
        const harga = document.getElementById('swal-harga').value;

        if (!produk || !kategori || !harga) {
          Swal.showValidationMessage('Semua field harus diisi!');
          return false;
        }

        return { imageFile, produk, kategori, harga: parseFloat(harga) };
      }
    });

    if (formValues) {
      try {
        const formData = new FormData();
        if (formValues.imageFile) {
          formData.append('thumbnail', formValues.imageFile);
        }
        formData.append('produk', formValues.produk);
        formData.append('kategori', formValues.kategori);
        formData.append('harga', formValues.harga);

        await axios.put(`http://localhost:5000/api/produk/${product.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Produk berhasil diupdate',
          confirmButtonColor: '#2563eb',
        });
        
        fetchProducts();
      } catch (error) {
        console.error('Error updating product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: error.response?.data?.error || 'Gagal mengupdate produk',
          confirmButtonColor: '#dc2626',
        });
      }
    }
  };

  const handleDelete = async (product) => {
    const result = await Swal.fire({
      title: 'Hapus Produk?',
      html: `Apakah Anda yakin ingin menghapus produk <strong>${product.produk}</strong>?<br/>Tindakan ini tidak dapat dibatalkan.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/produk/${product.id}`);
        
        Swal.fire({
          icon: 'success',
          title: 'Terhapus!',
          text: 'Produk berhasil dihapus',
          confirmButtonColor: '#2563eb',
        });
        
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Gagal menghapus produk',
          confirmButtonColor: '#dc2626',
        });
      }
    }
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
          <button 
            onClick={handleAdd}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tambah Produk
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            ⬇ Generate Report
          </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">#</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thumbnail</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Produk</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kategori</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Harga</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                      {product.thumbnail && product.thumbnail !== 'Link Gambar' ? (
                        <img
                          src={`http://localhost:5000${product.thumbnail}`}
                          alt={product.produk}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<span class="text-gray-400 text-xs">No Image</span>';
                          }}
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{product.produk}</td>
                  <td className="px-6 py-4 text-gray-700">{product.kategori}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{formatCurrency(product.harga)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <span className="text-gray-300">|</span>
                      <button 
                        onClick={() => handleDelete(product)}
                        className="text-red-600 hover:text-red-800 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Produk;
