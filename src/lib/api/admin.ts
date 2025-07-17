import { TravelPackage, Booking, Customer } from '@/types/packages';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const checkAdminAuth = async (): Promise<boolean> => {
  try {
    const url = `${API_BASE_URL}/api/admin/auth`;
    console.log('Fetching auth at:', url); // Debugging
    const response = await fetch(url, {
      credentials: 'include',
    });
    const data = await response.json();
    return response.ok && data.authenticated;
  } catch (error) {
    console.error('Error checking admin auth:', error);
    return false;
  }
};

export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Invalid credentials');
    }
    return data.success === true;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/api/admin/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export const getDashboardStats = async (): Promise<{
  totalPackages: number;
  activeBookings: number;
  totalCustomers: number;
  revenue: number;
}> => {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    credentials: 'include',
  });
  if (!response.ok) {
    const errorText = await response.text();
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

export const getPackages = async (): Promise<TravelPackage[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/packages`);
  if (!response.ok) throw new Error('Failed to fetch packages');
  return response.json();
};

export const getPackageById = async (id: number): Promise<TravelPackage> => {
  const response = await fetch(`${API_BASE_URL}/admin/packages/${id}`);
  if (!response.ok) throw new Error('Failed to fetch package');
  return response.json();
};

export const createPackage = async (data: Omit<TravelPackage, 'id'>): Promise<TravelPackage> => {
  const response = await fetch(`${API_BASE_URL}/admin/packages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create package');
  return response.json();
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