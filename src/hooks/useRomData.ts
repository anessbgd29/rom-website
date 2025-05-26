// src/hooks/useRomData.ts
import { useState, useEffect } from 'react';
import { Rom } from '../types/Rom';
import { fetchRoms } from '../services/mockApi';

export const useRomData = () => {
  const [allRoms, setAllRoms] = useState<Rom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filters
  const [selectedRomName, setSelectedRomName] = useState<string>('');
  const [selectedAndroidVersion, setSelectedAndroidVersion] = useState<string>('');
  const [selectedBuildType, setSelectedBuildType] = useState<string>('');
  
  // Fetch ROM data
  useEffect(() => {
    const loadRoms = async () => {
      try {
        setLoading(true);
        const data = await fetchRoms();
        setAllRoms(data);
        setError(null);
      } catch (err) {
        setError('Failed to load ROM data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadRoms();
  }, []);
  
  // Filter options
  const romNames: string[] = [...new Set(allRoms.map(rom => rom.rom_name))].sort();
  const androidVersions: string[] = [...new Set(allRoms.map(rom => rom.android_version || '').filter(Boolean))].sort();
  const buildTypes: string[] = [...new Set(allRoms.flatMap(rom => rom.build_type || []))].sort();
  
  // Filtered ROMs
  const filteredRoms = allRoms.filter(rom => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = rom.rom_name.toLowerCase().includes(query);
      const matchesVersion = rom.rom_version?.toLowerCase().includes(query) || false;
      const matchesAndroid = rom.android_version?.toLowerCase().includes(query) || false;
      
      if (!matchesName && !matchesVersion && !matchesAndroid) {
        return false;
      }
    }
    
    // Filter by ROM name
    if (selectedRomName && rom.rom_name !== selectedRomName) {
      return false;
    }
    
    // Filter by Android version
    if (selectedAndroidVersion && rom.android_version !== selectedAndroidVersion) {
      return false;
    }
    
    // Filter by build type
    if (selectedBuildType && (!rom.build_type || !rom.build_type.includes(selectedBuildType))) {
      return false;
    }
    
    return true;
  });
  
  // Reset filters
  const resetFilters = () => {
    setSelectedRomName('');
    setSelectedAndroidVersion('');
    setSelectedBuildType('');
    setSearchQuery('');
  };
  
  return {
    allRoms,
    filteredRoms,
    romNames,
    androidVersions,
    buildTypes,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedRomName,
    setSelectedRomName,
    selectedAndroidVersion,
    setSelectedAndroidVersion,
    selectedBuildType,
    setSelectedBuildType,
    resetFilters
  };
};
