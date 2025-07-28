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
  console.log('Fetching packages stats from:', `${API_BASE_URL}/api/admin/package`);
  const response = await fetch(`${API_BASE_URL}/api/admin/packages`, {
    credentials: 'include',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch packages');
  }
  
  return response.json();
};

export const getPackageById = async (id: number): Promise<TravelPackage> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/packages/${id}`, {
    credentials: 'include',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch package');
  }
  
  return response.json();
};


export const createPackage = async (data: Omit<TravelPackage, 'id'>): Promise<TravelPackage> => {
  try {
    // Transform data to match Prisma schema
    const transformedData = {
      ...data,
      rating: data.rating ? parseFloat(data.rating as unknown as string) : null, // Handle optional rating
      reviewsCount: data.reviewsCount ? parseInt(data.reviewsCount as unknown as string, 10) : null, // Handle optional reviewsCount
      availability: data.availability, // Already an object, should be JSON-serializable
      readyToPickup: data.readyToPickup, // Already an array of objects, should be JSON-serializable
    };

    const response = await fetch(`${API_BASE_URL}/api/admin/packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(transformedData),
    });

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

export const updatePackage = async (
  id: number,
  data: Partial<TravelPackage>
): Promise<TravelPackage> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/packages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

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
      throw new Error(error.message || 'Failed to update package');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in updatePackage:', error);
    throw error;
  }
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