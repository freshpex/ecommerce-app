'use client';

import { useStore } from '@/store/useStore';
import Link from 'next/link';
import { FiPackage } from 'react-icons/fi';

export default function OrderHistory() {
  const { orders } = useStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Order History</h1>
      
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">
                    Order #{order.id}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {order.status}
                </span>
              </div>
              
              <div className="border-t dark:border-gray-700 pt-4 mt-4">
                <p className="font-semibold dark:text-white">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Items: {order.items.length}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            No orders yet
          </p>
          <Link
            href="/"
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
