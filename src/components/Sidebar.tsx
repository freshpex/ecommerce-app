'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { FaWindowClose } from 'react-icons/fa';

export default function Sidebar() {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  return (
    <div 
      className={`h-screen w-64 shrink-0 ${
        isSidebarOpen ? 'fixed z-30 md:relative' : 'fixed -translate-x-full md:relative md:translate-x-0'
     } transition-transform duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-lg`}
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">Menu</h2>
        <button 
          onClick={toggleSidebar} 
          className="text-white focus:outline-none md:hidden"
        >
          <FaWindowClose size={24} />
        </button>
      </div>
      <nav className="mt-4">
        <Link href="/" className="block py-2 px-4 hover:bg-blue-600 transition-colors">
          Home
        </Link>
        <Link href="/checkout" className="block py-2 px-4 hover:bg-blue-600 transition-colors">
          Checkout
        </Link>
      </nav>
    </div>
  );
}