// src/components/FilterPanel.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  alpha,
  useTheme
} from '@mui/material';
import { FilterList as FilterListIcon } from '@mui/icons-material';

interface FilterPanelProps {
  selectedRomName: string;
  setSelectedRomName: (value: string) => void;
  selectedAndroidVersion: string;
  setSelectedAndroidVersion: (value: string) => void;
  selectedBuildType: string;
  setSelectedBuildType: (value: string) => void;
  resetFilters: () => void;
  romNames: string[];
  androidVersions: string[];
  buildTypes: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedRomName,
  setSelectedRomName,
  selectedAndroidVersion,
  setSelectedAndroidVersion,
  selectedBuildType,
  setSelectedBuildType,
  resetFilters,
  romNames,
  androidVersions,
  buildTypes
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(to right bottom, rgba(37, 38, 43, 0.9), rgba(37, 38, 43, 0.7))'
          : 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 30px rgba(0, 0, 0, 0.1)'
          : '0 4px 30px rgba(0, 0, 0, 0.05)',
        border: `1px solid ${
          theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0.7)'
        }`,
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        borderBottom: `1px solid ${theme.palette.divider}`,
        pb: 2
      }}>
        <FilterListIcon sx={{ 
          mr: 1.5,
          color: theme.palette.primary.main,
          fontSize: '1.5rem'
        }} />
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('filter.title')}
        </Typography>
      </Box>
      
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2}
        sx={{
          '& .MuiFormControl-root': {
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }
        }}
      >
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="rom-name-label">{t('filter.romName')}</InputLabel>
            <Select
              labelId="rom-name-label"
              value={selectedRomName}
              label={t('filter.romName')}
              onChange={(e) => setSelectedRomName(e.target.value)}
              sx={{
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(0, 0, 0, 0.15)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <MenuItem value="">{t('filter.reset')}</MenuItem>
              {romNames.map((name) => (
                <MenuItem key={name} value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="android-version-label">{t('filter.androidVersion')}</InputLabel>
            <Select
              labelId="android-version-label"
              value={selectedAndroidVersion}
              label={t('filter.androidVersion')}
              onChange={(e) => setSelectedAndroidVersion(e.target.value)}
              sx={{
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(0, 0, 0, 0.15)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <MenuItem value="">{t('filter.reset')}</MenuItem>
              {androidVersions.map((version) => (
                <MenuItem key={version} value={version}>Android {version}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="build-type-label">{t('filter.buildType')}</InputLabel>
            <Select
              labelId="build-type-label"
              value={selectedBuildType}
              label={t('filter.buildType')}
              onChange={(e) => setSelectedBuildType(e.target.value)}
              sx={{
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(0, 0, 0, 0.15)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <MenuItem value="">{t('filter.reset')}</MenuItem>
              {buildTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        <Button
          variant="outlined"
          onClick={resetFilters}
          sx={{
            borderRadius: '8px',
            borderColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(0, 0, 0, 0.15)',
            color: theme.palette.text.secondary,
            '&:hover': {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {t('filter.resetAll')}
        </Button>
      </Stack>
    </Paper>
  );
};

export default FilterPanel;
