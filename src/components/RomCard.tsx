// src/components/RomCard.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  useTheme
} from '@mui/material';
import { Download as DownloadIcon, Info as InfoIcon } from '@mui/icons-material';
import { Rom } from '../types/Rom';

interface RomCardProps {
  rom: Rom;
  onDetailsClick: (rom: Rom) => void;
  getPlaceholderImage: (romName: string) => string;
  formatDate: (dateString: string) => string;
}

const RomCard: React.FC<RomCardProps> = ({ 
  rom, 
  onDetailsClick, 
  getPlaceholderImage,
  formatDate 
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[8],
          '& .MuiCardMedia-root': {
            transform: 'scale(1.05)',
          }
        }
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="180"
          image={rom.image_path ? `path/to/images/${rom.image_path}` : getPlaceholderImage(rom.rom_name)}
          alt={rom.rom_name}
          sx={{
            transition: 'transform 0.3s ease-in-out',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
            height: '80px',
            display: 'flex',
            alignItems: 'flex-start',
            padding: '16px',
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {rom.build_type && rom.build_type.map((type) => (
              <Chip 
                key={type} 
                label={type} 
                size="small" 
                color={type === 'Official' ? 'primary' : 'default'}
                sx={{
                  backgroundColor: type === 'Official' ? 'rgba(25, 118, 210, 0.9)' : 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(4px)',
                  color: '#fff',
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="div"
          sx={{
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {rom.rom_name}
          {rom.android_version && (
            <Chip 
              label={`Android ${rom.android_version}`} 
              size="small" 
              color="secondary"
              sx={{
                ml: 1,
                background: theme.palette.secondary.main,
                color: '#fff',
                fontWeight: 600,
              }}
            />
          )}
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {rom.rom_version}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {rom.date && (
            <Typography 
              variant="body2" 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.text.secondary,
                '& svg': { mr: 0.5 }
              }}
            >
              <span style={{ opacity: 0.7 }}>{formatDate(rom.date)}</span>
            </Typography>
          )}
        </Box>
        
        {rom.maintainer && (
          <Typography 
            variant="body2" 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              color: theme.palette.text.secondary,
              opacity: 0.8
            }}
          >
            {t('rom.maintainer')}: {rom.maintainer}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ padding: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          {rom.download_links && rom.download_links.length > 0 && (
            <Button 
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              href={rom.download_links[0]}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              }}
            >
              {t('rom.download')}
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<InfoIcon />}
            onClick={() => onDetailsClick(rom)}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                transform: 'translateY(-2px)',
              }
            }}
          >
            {t('rom.details')}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default RomCard;
