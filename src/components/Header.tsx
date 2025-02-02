'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FaBars, FaWindowClose, FaWindowMaximize, FaShoppingCart } from 'react-icons/fa';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Header() {
  const cart = useStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 right-0 z-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <div className="px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar} 
            className="md:hidden text-white focus:outline-none"
          >
            <FaBars size={24} />
          </button>
          <Link href="/" className="text-2xl font-bold">
            E-Commerce Store
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/checkout" 
            className="flex items-center gap-2 hover:text-gray-200 transition-colors"
          >
            <FaShoppingCart size={24} />
            <span>Cart ({totalItems})</span>
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded hover:bg-blue-600"
          >
          {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
