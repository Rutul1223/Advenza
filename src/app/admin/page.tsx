// app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getDashboardStats } from '@/lib/api/admin';
import StatCard from '@/components/adminLayouts/StatCard';

export default function AdminDashboard() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPackages: 0,
    activeBookings: 0,
    totalCustomers: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not logged in or not an admin
    if (!isLoggedIn || user?.type !== 'admin') {
      router.push('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn || user?.type !== 'admin') {
    return null; // Render nothing while redirecting
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="grid grid-cols-1 gap-6">
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={
            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          color="bg-yellow-500"
        />
      </div>
    </div>
  );
}