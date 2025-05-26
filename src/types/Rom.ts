// src/types/Rom.ts
export interface Rom {
  message_id: string;
  date: string;
  edited_date?: string;
  rom_name: string;
  rom_version?: string;
  android_version?: string;
  build_type: string[];
  download_links: string[];
  image_path?: string;
  changelog?: string;
  bugs?: string;
  notes?: string;
  maintainer?: string;
  raw_text?: string;
}

export interface RomsData {
  all_roms: Rom[];
  by_name: Record<string, Rom[]>;
  by_android_version: Record<string, Rom[]>;
  by_build_type: Record<string, Rom[]>;
}
