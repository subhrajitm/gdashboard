import { Shop, ShopStatusOption } from '../types';

export const getShops = async (): Promise<Shop[]> => {
  try {
    const response = await fetch('/api/shops');
    if (!response.ok) {
      throw new Error('Failed to fetch shops');
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching shops: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching shops');
  }
};

export const getShopStatusOptions = async (): Promise<ShopStatusOption[]> => {
  try {
    const response = await fetch('/api/shops/status-options');
    if (!response.ok) {
      throw new Error('Failed to fetch shop status options');
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching shop status options: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching shop status options');
  }
};

export const getShopLocations = async (): Promise<string[]> => {
  try {
    const response = await fetch('/api/shops/locations');
    if (!response.ok) {
      throw new Error('Failed to fetch shop locations');
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching shop locations: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching shop locations');
  }
}; 