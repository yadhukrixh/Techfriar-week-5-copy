"use client"


// Import the Inter font from Google Fonts
import { Inter } from 'next/font/google';

// Import global CSS styles
import './globals.css';

// Import the NavBar component
import NavBar from '@/components/UserComponents/NavBar/NavBar';

// Import the usePathname hook from Next.js navigation
import { usePathname } from 'next/navigation'; 

// Import the Footer component
import Footer from '@/components/UserComponents/Footer/Footer';

// Initialize the Inter font with the latin subset
const inter = Inter({ subsets: ['latin'] });

/**
 * RootLayout component that wraps the entire application.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} The RootLayout component
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the current pathname using the usePathname hook
  const pathname = usePathname();

  // Check if the current page is an admin page
  const isAdminPage = pathname.startsWith('/Admin');

  // Render the HTML document with the Inter font and conditionally render the NavBar and Footer
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Conditionally render the NavBar if not on an admin page */}
        {!isAdminPage && <NavBar />}
        {/* Render the child components */}
        {children}
        {/* Conditionally render the Footer if not on an admin page */}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}
