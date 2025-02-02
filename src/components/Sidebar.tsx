'use client';

import { useStore } from '@/store/useStore';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { BsWindow, BsWindowStack } from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import { FiHome, FiShoppingCart, FiActivity } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';

interface MenuItem {
  icon: React.ReactElement;
  label: string;
  href: string;
}

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const { isSidebarOpen, toggleSidebar, isDesktopSidebarOpen, toggleDesktopSidebar } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sidebarClass = isMobile
    ? `fixed inset-y-0 left-0 z-40 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`
    : `sidebar-transition h-screen ${
        isDesktopSidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'
      }`;

  const handleNavigation = async (href: string) => {
    setIsLoading(true);
    if (isMobile) {
      toggleSidebar();
    }
    await router.push(href);
    setIsLoading(false);
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.href;
    return (
      <button
        onClick={() => handleNavigation(item.href)}
        className={`flex items-center gap-4 p-3 rounded-lg transition-colors w-full text-left ${
          isActive
            ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <div className="text-xl">{item.icon}</div>
        {(isMobile ? isSidebarOpen : isDesktopSidebarOpen) && (
          <span className="whitespace-nowrap">{item.label}</span>
        )}
      </button>
    );
  };

  return (
    <aside className={`${sidebarClass} ${
      "dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 bg-gradient-to-r from-blue-500 to-purple-600"
    }`}>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            {(isMobile ? isSidebarOpen : isDesktopSidebarOpen) && (
              <h2 className="text-xl font-bold text-white">Menu</h2>
            )}
            {isMobile ? (
              <button onClick={toggleSidebar} className="text-white hover:text-gray-300">
                <IoClose size={24} />
              </button>
            ) : (
              <button onClick={toggleDesktopSidebar} className="text-white hover:text-gray-300">
                {isDesktopSidebarOpen ? (
                  <BsWindowStack size={24} />
                ) : (
                  <BsWindow size={24} />
                )}
              </button>
            )}
          </div>
          <nav className="flex flex-col gap-2">
            {menuItems.map((item, index) => (
              <div key={index}>{renderMenuItem(item)}</div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}

const menuItems = [
  {
    icon: <FiHome size={20} />,
    label: 'Home',
    href: '/'
  },
  {
    icon: <FiShoppingCart size={20} />,
    label: 'Checkout',
    href: '/checkout'
  },
  {
    icon: <FiActivity size={20} />,
    label: 'Orders',
    href: '/orders'
  },
  // More items for further developement
];