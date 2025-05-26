#!/usr/bin/env python3
import csv
import json
import os

# Input and output file paths
input_csv = "/home/ubuntu/rom-website/src/assets/roms_for_website.csv"
output_json = "/home/ubuntu/rom-website/src/assets/roms_data.json"

# Function to convert CSV to structured JSON
def convert_csv_to_json(csv_file, json_file):
    # Read CSV file
    roms_data = []
    with open(csv_file, 'r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            # Process download links (convert string to array)
            if row.get('download_links'):
                row['download_links'] = [link.strip() for link in row['download_links'].split(',') if link.strip()]
            
            # Process build type (convert string to array)
            if row.get('build_type'):
                row['build_type'] = [build.strip() for build in row['build_type'].split(',') if build.strip()]
            
            # Add the processed row to our data
            roms_data.append(row)
    
    # Organize data by ROM name for easier access
    organized_data = {
        "all_roms": roms_data,
        "by_name": {},
        "by_android_version": {},
        "by_build_type": {}
    }
    
    # Create indexes for faster filtering
    for rom in roms_data:
        # Index by ROM name
        rom_name = rom.get('rom_name')
        if rom_name:
            if rom_name not in organized_data["by_name"]:
                organized_data["by_name"][rom_name] = []
            organized_data["by_name"][rom_name].append(rom)
        
        # Index by Android version
        android_version = rom.get('android_version')
        if android_version:
            if android_version not in organized_data["by_android_version"]:
                organized_data["by_android_version"][android_version] = []
            organized_data["by_android_version"][android_version].append(rom)
        
        # Index by build types
        build_types = rom.get('build_type', [])
        if isinstance(build_types, list):
            for build_type in build_types:
                if build_type not in organized_data["by_build_type"]:
                    organized_data["by_build_type"][build_type] = []
                organized_data["by_build_type"][build_type].append(rom)
    
    # Write to JSON file
    with open(json_file, 'w', encoding='utf-8') as file:
        json.dump(organized_data, file, ensure_ascii=False, indent=2)
    
    return organized_data

# Execute the conversion
try:
    data = convert_csv_to_json(input_csv, output_json)
    print(f"Conversion successful! JSON data saved to {output_json}")
    print(f"Total ROMs: {len(data['all_roms'])}")
    print(f"Unique ROM names: {len(data['by_name'])}")
    print(f"Android versions: {list(data['by_android_version'].keys())}")
    print(f"Build types: {list(data['by_build_type'].keys())}")
except Exception as e:
    print(f"Error during conversion: {e}")
