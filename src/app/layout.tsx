import { Providers } from './providers';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import { LoadingProvider } from '@/contexts/LoadingContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900">
        <Providers>
          <LoadingProvider>
            <div className="flex gap-2 min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col min-h-screen content-transition">
                <Header />
                <main className="flex-1 p-4">
                  <div className="max-w-7xl mx-auto w-full">
                    {children}
                  </div>
                </main>
              </div>
            </div>
            <ToastContainer />
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  );
}