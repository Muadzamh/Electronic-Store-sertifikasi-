import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Calendar, DollarSign, CheckSquare, MessageSquare } from 'lucide-react';

const Admin = () => {
  const [summary, setSummary] = useState({
    monthlyEarnings: 0,
    annualEarnings: 0,
    totalProducts: 0,
    tasks: 50,
    pendingRequests: 18
  });
  const [earningsData, setEarningsData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const summaryRes = await axios.get('http://localhost:5000/api/dashboard-summary');
      setSummary(summaryRes.data);

      const earningsRes = await axios.get('http://localhost:5000/api/data-penjualan');
      const formattedEarnings = earningsRes.data.map(item => ({
        name: item.bulan.substring(0, 3),
        value: item.total_pendapatan / 1000000
      }));
      setEarningsData(formattedEarnings);

      const revenueRes = await axios.get('http://localhost:5000/api/revenue-by-product');
      console.log('Revenue data from API:', revenueRes.data);
      const formattedRevenue = revenueRes.data.map(item => ({
        name: item.kategori,
        value: parseInt(item.total_produk)
      }));
      console.log('Formatted revenue data:', formattedRevenue);
      setRevenueData(formattedRevenue);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const COLORS = ['#4F46E5', '#10B981', '#06B6D4'];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-blue-600 font-semibold mb-2">EARNINGS (MONTHLY)</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(summary.monthlyEarnings)}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-green-600 font-semibold mb-2">EARNINGS (ANNUAL)</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(summary.annualEarnings)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-sm text-cyan-600 font-semibold mb-2">TASKS</p>
              <p className="text-2xl font-bold text-gray-800">{summary.tasks}%</p>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${summary.tasks}%` }}></div>
              </div>
            </div>
            <div className="p-3 bg-cyan-100 rounded-full">
              <CheckSquare className="text-cyan-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-yellow-600 font-semibold mb-2">PENDING REQUESTS</p>
              <p className="text-2xl font-bold text-gray-800">{summary.pendingRequests}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <MessageSquare className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-blue-600">Earnings Overview</h2>
            <button className="text-gray-400 hover:text-gray-600">⋮</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={(value) => `${value}M`} />
              <Tooltip
                formatter={(value) => `Rp ${value.toFixed(1)}M`}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Area type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-blue-600">Revenue Sources</h2>
            <button className="text-gray-400 hover:text-gray-600">⋮</button>
          </div>
          {revenueData.length === 0 ? (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              Loading chart data...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} Produk`, name]}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          ⬇ Generate Report
        </button>
      </div>
    </div>
  );
};

export default Admin;
