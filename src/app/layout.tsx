import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import './globals.css';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900">
        <Providers>
          <Navbar />
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}