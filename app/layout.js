import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'SmartPark Chandigarh — Intelligent Parking Management System',
  description: 'AI-powered smart parking management for Chandigarh Smart City. Real-time occupancy tracking, EV charging, automated entry, and predictive analytics.',
  keywords: 'smart parking, chandigarh, IoT, AI, parking management, EV charging',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
