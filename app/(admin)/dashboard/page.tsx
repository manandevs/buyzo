import { supabase } from '@/lib/supabase';
import { FiBox, FiFolder, FiShoppingCart, FiUsers } from 'react-icons/fi';

export const revalidate = 0;

export default async function DashboardHome() {
  const [productsResponse, categoriesResponse, ordersResponse, usersResponse] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('users').select('*', { count: 'exact', head: true }), // added
  ]);

  const productsCount = productsResponse.count || 0;
  const categoriesCount = categoriesResponse.count || 0;
  const ordersCount = ordersResponse.count || 0;
  const usersCount = usersResponse.count || 0; // added

  const stats = [
    { title: "Total Products", count: productsCount, icon: FiBox },
    { title: "Total Categories", count: categoriesCount, icon: FiFolder },
    { title: "Total Orders", count: ordersCount, icon: FiShoppingCart },
    { title: "Total Users", count: usersCount, icon: FiUsers }, // fixed
  ];

  return (
    <div className="flex flex-col gap-8 max-w-360 w-full mx-auto px-6">
      <h1 className="text-4xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 rounded-2xl p-4 flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,31,162,0.1)] overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-lg">{stat.title}</h3>
              <stat.icon size={24} className="group-hover:scale-110 transition-transform" />
            </div>

            <p className="text-5xl font-bold mt-2">{stat.count}</p>

            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}