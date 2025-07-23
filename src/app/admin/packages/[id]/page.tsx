'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPackageById, updatePackage } from '@/lib/api/admin';
import { TravelPackage } from '@/generated/prisma';
import PackageForm from '../components/PackageForm';

export default function EditPackagePage({ params }: { params: { id: string } }) {
  const [packageData, setPackageData] = useState<TravelPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const data = await getPackageById(params.id);
        setPackageData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch package');
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [params.id]);

  const handleSubmit = async (data: Omit<TravelPackage, 'id'>) => {
    try {
      await updatePackage(params.id, data);
      router.push('/admin/packages');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update package');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!packageData) return <div>Package not found</div>;

  return (
    <div className="py-8">
      <PackageForm 
        initialData={packageData} 
        onSubmit={handleSubmit} 
        isEditMode 
      />
    </div>
  );
}