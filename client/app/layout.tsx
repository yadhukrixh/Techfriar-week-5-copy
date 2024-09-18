"use client"
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/UserComponents/NavBar/NavBar';
import { usePathname } from 'next/navigation'; // Ensure this is imported from 'next/navigation' 
import Footer from '@/components/UserComponents/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/Admin');


  return (
    <html lang="en">
      <body className={inter.className}>
        {!isAdminPage && <NavBar />} {/* Conditionally render NavBar */}
        {children}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}
