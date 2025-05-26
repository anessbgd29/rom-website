// src/utils/helpers.ts
import { Rom } from '../types/Rom';

/**
 * Generate a placeholder image for ROMs without images
 * @param romName ROM name to use for placeholder
 * @returns URL for placeholder image
 */
export const getPlaceholderImage = (romName: string): string => {
  // Generate a random color for the placeholder
  return `https://via.placeholder.com/400x200/${Math.floor(Math.random() * 16777215).toString(16)}/FFFFFF?text=${romName}`;
};

/**
 * Format date to locale string
 * @param dateString Date string to format
 * @param locale Current locale (language)
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, locale: string = 'en'): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Filter ROMs based on search criteria
 * @param roms Array of ROMs to filter
 * @param searchQuery Search query string
 * @param romName Selected ROM name filter
 * @param androidVersion Selected Android version filter
 * @param buildType Selected build type filter
 * @returns Filtered array of ROMs
 */
export const filterRoms = (
  roms: Rom[],
  searchQuery: string = '',
  romName: string = '',
  androidVersion: string = '',
  buildType: string = ''
): Rom[] => {
  let result = [...roms];
  
  // Apply ROM name filter
  if (romName) {
    result = result.filter(rom => rom.rom_name === romName);
  }
  
  // Apply Android version filter
  if (androidVersion) {
    result = result.filter(rom => rom.android_version === androidVersion);
  }
  
  // Apply build type filter
  if (buildType) {
    result = result.filter(rom => 
      rom.build_type && rom.build_type.includes(buildType)
    );
  }
  
  // Apply search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    result = result.filter(rom => 
      (rom.rom_name && rom.rom_name.toLowerCase().includes(query)) ||
      (rom.android_version && rom.android_version.toLowerCase().includes(query)) ||
      (rom.maintainer && rom.maintainer.toLowerCase().includes(query)) ||
      (rom.changelog && rom.changelog.toLowerCase().includes(query))
    );
  }
  
  return result;
};
