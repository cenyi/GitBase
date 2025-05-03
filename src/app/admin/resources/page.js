'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ResourceList from '@/components/ResourceList';
import { Button } from '@/components/ui/button';

export default function AdminResourcesPage() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch('/api/resources');
        const data = await res.json();
        setResources(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (isLoading) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resource Management</h1>
        <div className="flex gap-2">
          <Button onClick={handleRefresh}>Refresh</Button>
          <Button onClick={() => router.push('/admin/resources/create')}>
            Add Resource
          </Button>
        </div>
      </div>
      <ResourceList resources={resources} showMoreLink={false} />
    </div>
  );
}