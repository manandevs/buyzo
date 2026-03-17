"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Order } from '@/types';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { updateOrderStatusAction } from '@/app/actions/orders';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      if (data) setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:');
      setError('Failed to fetch orders.');
      toast.error('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (id: string, newStatus: Order['status']) => {
    setUpdatingId(id);
    try {
      // Call the secure Server Action
      await updateOrderStatusAction(id, newStatus);
      
      // Update local state to instantly synchronize the UI without a hard reload
      setOrders(prevOrders => 
        prevOrders.map(order => order.id === id ? { ...order, status: newStatus } : order)
      );
      
      toast.success(`Order ${id.split('-')[0]} status updated to ${newStatus}!`);
    } catch (err) {
      console.error('Error updating order status:');
      toast.error('Failed to update order status.');
      
      // If it fails, refetch to ensure UI matches the true database state
      fetchOrders();
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold">Orders</h1>

      {loading ? (
        <div className="text-center text-gray-400 p-8">Loading orders...</div>
      ) : error ? (
        <div className="text-center text-red-500 p-8">{error}</div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 bg-black/20">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer ID</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Order Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4 font-mono text-sm text-gray-400">{order.id.split('-')[0]}...</td>
                  <td className="p-4 font-mono text-sm text-gray-400">{order.user_id}</td>
                  <td className="p-4">R {order.total_amount?.toFixed(2) || '0.00'}</td>
                  <td className="p-4 text-gray-400">{order.created_at ? format(new Date(order.created_at), 'MMM dd, yyyy HH:mm') : 'N/A'}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => updateStatus(order.id, e.target.value as Order['status'])}
                      className="bg-black border border-gray-700 p-2 rounded-lg text-white focus:outline-none focus:border-[#BA68C8] disabled:opacity-50"
                      aria-label={`Change status for order ${order.id.split('-')[0]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <div className="p-8 text-center text-gray-500">No orders placed yet.</div>}
        </div>
      )}
    </div>
  );
}