import { TravelPackage, Booking, Customer } from '@/types/packages';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';


export const signOut = async (): Promise<void> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${API_BASE_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to sign out: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.error('Error signing out:', error);
    throw error; // Let the caller handle the error
  }
};

// src/lib/api/admin.ts
export const getDashboardStats = async (): Promise<{
  totalPackages: number;
  activeBookings: number;
  totalCustomers: number;
  revenue: number;
}> => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  console.log('Fetching dashboard stats from:', `${API_BASE_URL}/api/admin/dashboard`); // Debugging
  const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
    method: 'GET', // Explicitly specify GET
    credentials: 'include',
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Dashboard fetch error:', response.status, errorText); // Debugging
    throw new Error(`Failed to fetch dashboard stats: ${response.status} ${errorText}`);
  }
  const data = await response.json();
  if (
    typeof data.totalPackages !== 'number' ||
    typeof data.activeBookings !== 'number' ||
    typeof data.totalCustomers !== 'number' ||
    typeof data.revenue !== 'number'
  ) {
    throw new Error('Invalid response format from dashboard API');
  }
  return data;
};

// src/lib/api/admin.ts
export const getPackages = async (): Promise<TravelPackage[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/packages`, {
      method: 'GET',
      credentials: 'include', // Include cookies for authentication
      headers: {
        'Cache-Control': 'no-cache', // Optional: Disable caching for testing
        'Accept': 'application/json', // Request JSON
      },
      redirect: 'manual', // Prevent automatic redirect following
    });

    // Handle redirect statuses (301, 302, 303)
    if ([301, 302, 303].includes(response.status)) {
      console.warn(`Received redirect status ${response.status} for /admin/packages`);
      const redirectUrl = response.headers.get('Location');
      console.warn('Redirect URL:', redirectUrl);
      return []; // Return empty array for redirects (e.g., unauthenticated)
    }

    // Handle 304 Not Modified
    if (response.status === 304) {
      console.log('Received 304 Not Modified, returning empty array');
      return [];
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch packages: ${response.status} ${errorText}`);
      throw new Error(`Failed to fetch packages: ${response.status} ${errorText}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', text);
      throw new Error('Received non-JSON response from server');
    }

    const data = await response.json();
    return data || []; // Return empty array if data is null/undefined
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error; // Let the caller handle the error
  }
};

export const getPackageById = async (id: number): Promise<TravelPackage> => {
  const response = await fetch(`${API_BASE_URL}/admin/packages/${id}`);
  if (!response.ok) throw new Error('Failed to fetch package');
  return response.json();
};

export const createPackage = async (data: Omit<TravelPackage, 'id'>): Promise<TravelPackage> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${API_BASE_URL}/api/admin/packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    // Check for redirects
    if (response.redirected) {
      window.location.href = response.url;
      throw new Error('Authentication required');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON, got ${contentType}: ${text}`);
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create package');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in createPackage:', error);
    throw error;
  }
};

export const updatePackage = async (id: number, data: Partial<TravelPackage>): Promise<TravelPackage> => {
  const response = await fetch(`${API_BASE_URL}/admin/packages/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update package');
  return response.json();
};

export const deletePackage = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/packages/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete package');
};

export const getBookings = async (): Promise<Booking[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/bookings`);
  if (!response.ok) throw new Error('Failed to fetch bookings');
  return response.json();
};

export const updateBookingStatus = async (id: number, status: string): Promise<Booking> => {
  const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update booking status');
  return response.json();
};

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/customers`);
  if (!response.ok) throw new Error('Failed to fetch customers');
  return response.json();
};