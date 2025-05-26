// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
  CircularProgress,
  useTheme,
  Container,
  Paper,
  Alert
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Language as LanguageIcon
} from '@mui/icons-material';

import FilterPanel from '../components/FilterPanel';
import RomCard from '../components/RomCard';
import RomDetailsDialog from '../components/RomDetailsDialog';
import { useRomData } from '../hooks/useRomData';
import { Rom } from '../types/Rom';
import { getPlaceholderImage } from '../utils/helpers';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Theme state
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  
  // ROM data
  const { 
    filteredRoms, 
    loading, 
    error,
    romNames,
    androidVersions,
    buildTypes,
    selectedRomName,
    setSelectedRomName,
    selectedAndroidVersion,
    setSelectedAndroidVersion,
    selectedBuildType,
    setSelectedBuildType,
    resetFilters
  } = useRomData();
  
  // ROM details dialog
  const [selectedRom, setSelectedRom] = useState<Rom | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  // Toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  // Toggle theme
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
  };
  
  // Change language
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };
  
  // Open ROM details
  const openDetails = (rom: Rom) => {
    setSelectedRom(rom);
    setDetailsOpen(true);
  };
  
  // Close ROM details
  const closeDetails = () => {
    setDetailsOpen(false);
  };
  
  // Format date with locale
  const formatDateWithLocale = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };
  
  // Set initial language direction
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('app.title')}
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      
      {/* Drawer */}
      <Drawer
        anchor={i18n.language === 'ar' ? 'right' : 'left'}
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            <ListItem>
              <Typography variant="h6" component="div">
                {t('app.title')}
              </Typography>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.home')} />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.favorites')} />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.settings')} />
            </ListItem>
          </List>
          
          <Divider />
          
          <List>
            <ListItem>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <Typography variant="subtitle2">
                {t('settings.language')}
              </Typography>
            </ListItem>
            
            <ListItem onClick={() => changeLanguage('en')}>
              <ListItemText 
                primary="English" 
                sx={{ color: i18n.language === 'en' ? 'primary.main' : 'inherit' }}
              />
            </ListItem>
            
            <ListItem onClick={() => changeLanguage('ar')}>
              <ListItemText 
                primary="العربية" 
                sx={{ color: i18n.language === 'ar' ? 'primary.main' : 'inherit' }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      
      {/* Main Content */}
      <Container sx={{ py: 4, flexGrow: 1 }}>
        {/* Filter Panel */}
        <FilterPanel
          selectedRomName={selectedRomName}
          setSelectedRomName={setSelectedRomName}
          selectedAndroidVersion={selectedAndroidVersion}
          setSelectedAndroidVersion={setSelectedAndroidVersion}
          selectedBuildType={selectedBuildType}
          setSelectedBuildType={setSelectedBuildType}
          resetFilters={resetFilters}
          romNames={romNames}
          androidVersions={androidVersions}
          buildTypes={buildTypes}
        />
        
        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        
        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {t('error.loading')}
          </Alert>
        )}
        
        {/* ROM Cards */}
        {!loading && !error && (
          <Stack direction="row" flexWrap="wrap" gap={3}>
            {filteredRoms.map((rom: Rom) => (
              <Box key={rom.message_id} sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}>
                <RomCard
                  rom={rom}
                  onDetailsClick={openDetails}
                  getPlaceholderImage={getPlaceholderImage}
                  formatDate={formatDateWithLocale}
                />
              </Box>
            ))}
          </Stack>
        )}
        
        {/* No Results */}
        {!loading && !error && filteredRoms.length === 0 && (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              {t('filter.noResults')}
            </Typography>
          </Paper>
        )}
      </Container>
      
      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            {t('app.footer')} {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
      
      {/* ROM Details Dialog */}
      <RomDetailsDialog
        open={detailsOpen}
        onClose={closeDetails}
        rom={selectedRom}
        getPlaceholderImage={getPlaceholderImage}
        formatDate={formatDateWithLocale}
      />
    </Box>
  );
};

export default HomePage;
