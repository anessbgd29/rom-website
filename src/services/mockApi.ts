// src/services/mockApi.ts
import { Rom } from '../types/Rom';
import romsData from '../assets/roms_data.json';

/**
 * Fetch all ROMs from the mock API
 * @returns Promise that resolves to an array of ROM objects
 */
export const fetchRoms = async (): Promise<Rom[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return the data from the JSON file - accessing all_roms property
  return romsData.all_roms as Rom[];
};

/**
 * Fetch a single ROM by ID
 * @param id ROM ID to fetch
 * @returns Promise that resolves to a ROM object or null if not found
 */
export const fetchRomById = async (id: string): Promise<Rom | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Find the ROM with the matching ID
  const rom = (romsData.all_roms as Rom[]).find(rom => rom.message_id === id);
  
  return rom || null;
};
