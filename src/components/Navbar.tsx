'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';

export default function Navbar() {
  const cart = useStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold dark:text-white">
            E-Commerce Store
          </Link>
          <Link 
            href="/checkout" 
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <span>Cart ({totalItems})</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}