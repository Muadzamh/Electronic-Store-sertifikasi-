import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, LogOut, Bell, Mail, User } from 'lucide-react';
import Swal from 'sweetalert2';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: 'Apakah Anda yakin ingin keluar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('admin');
        localStorage.removeItem('isLoggedIn');
        
        Swal.fire({
          icon: 'success',
          title: 'Logout Berhasil!',
          text: 'Sampai jumpa lagi',
          confirmButtonColor: '#2563eb',
          timer: 1500,
          showConfirmButton: false
        });

        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    });
  };

  const adminData = JSON.parse(localStorage.getItem('admin') || '{"nama":"Admin"}');

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-blue-600 rounded"></div>
          </div>
          <h1 className="text-xl font-bold">SB ADMIN²</h1>
        </div>

        <nav className="flex-1 px-4 py-6">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all ${
              isActive('/admin')
                ? 'bg-blue-700 text-white'
                : 'text-blue-100 hover:bg-blue-700 hover:text-white'
            }`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/produk"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/produk')
                ? 'bg-blue-700 text-white'
                : 'text-blue-100 hover:bg-blue-700 hover:text-white'
            }`}
          >
            <Package size={20} />
            <span>Product</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-blue-700">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-all w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for..."
                  className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-0 top-0 bottom-0 px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                  🔍
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-8">
              
              <button className="relative p-2 text-gray-600 hover:text-gray-800">
                <Bell size={20} />
              </button>

              <button className="relative p-2 text-gray-600 hover:text-gray-800">
                <Mail size={20} />
              </button>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-700">{adminData.nama}</span>
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={20} className="text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
