"use client"

import React, { useState, useEffect } from 'react';
import { getShops, getShopStatusOptions, getShopLocations } from '../../src/data/services/shopService';
import { Shop, ShopStatusOption } from '../../src/data/types';

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [statusOptions, setStatusOptions] = useState<ShopStatusOption[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shopsData, statusData, locationsData] = await Promise.all([
          getShops(),
          getShopStatusOptions(),
          getShopLocations()
        ]);
        setShops(shopsData);
        setStatusOptions(statusData);
        setLocations(locationsData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      {/* Rest of your component JSX */}
    </div>
  );
} 