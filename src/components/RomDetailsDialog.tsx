// src/components/RomDetailsDialog.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  CardMedia,
  IconButton,
  useTheme,
  Chip,
  alpha
} from '@mui/material';
import { Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material';
import { Rom } from '../types/Rom';

interface RomDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  rom: Rom | null;
  getPlaceholderImage: (romName: string) => string;
  formatDate: (dateString: string) => string;
}

const RomDetailsDialog: React.FC<RomDetailsDialogProps> = ({
  open,
  onClose,
  rom,
  getPlaceholderImage,
  formatDate
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  if (!rom) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby="rom-details-title"
      PaperProps={{
        sx: {
          borderRadius: '16px',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(to right bottom, rgba(37, 38, 43, 0.95), rgba(37, 38, 43, 0.85))'
            : 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
          backdropFilter: 'blur(10px)',
          boxShadow: theme.shadows[24],
          border: `1px solid ${
            theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(255, 255, 255, 0.7)'
          }`,
        }
      }}
    >
      <DialogTitle 
        id="rom-details-title"
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 2
        }}>
          <Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5
              }}
            >
              {rom.rom_name}
            </Typography>
            {rom.rom_version && (
              <Typography 
                variant="subtitle1" 
                color="text.secondary"
                sx={{ opacity: 0.8 }}
              >
                {rom.rom_version}
              </Typography>
            )}
          </Box>
          <IconButton 
            edge="end" 
            onClick={onClose} 
            aria-label="close"
            sx={{
              color: theme.palette.text.secondary,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'rotate(90deg)',
                color: theme.palette.primary.main,
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent 
        dividers
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: alpha(theme.palette.primary.main, 0.2),
            borderRadius: '4px',
            '&:hover': {
              background: alpha(theme.palette.primary.main, 0.3),
            }
          }
        }}
      >
        <Box sx={{ position: 'relative', mb: 3 }}>
          <CardMedia
            component="img"
            height="250"
            image={rom.image_path ? `path/to/images/${rom.image_path}` : getPlaceholderImage(rom.rom_name)}
            alt={rom.rom_name}
            sx={{ 
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: theme.shadows[8]
            }}
          />
          {rom.android_version && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(4px)',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Android {rom.android_version}
              </Typography>
            </Box>
          )}
        </Box>
        
        <Stack spacing={3}>
          <Box>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: theme.palette.primary.main
              }}
            >
              {t('rom.details')}
            </Typography>
            
            <Stack spacing={2}>
              {rom.build_type && rom.build_type.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {t('rom.buildType')}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {rom.build_type.map((type) => (
                      <Chip
                        key={type}
                        label={type}
                        size="small"
                        color={type === 'Official' ? 'primary' : 'default'}
                        sx={{
                          borderRadius: '8px',
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
              
              {rom.date && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {t('rom.releaseDate')}
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(rom.date)}
                  </Typography>
                </Box>
              )}
              
              {rom.maintainer && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {t('rom.maintainer')}
                  </Typography>
                  <Typography variant="body1">
                    {rom.maintainer}
                  </Typography>
                </Box>
              )}
              
              {rom.changelog && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {t('rom.changelog')}
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      whiteSpace: 'pre-line',
                      p: 2,
                      borderRadius: '8px',
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                    }}
                  >
                    {rom.changelog}
                  </Typography>
                </Box>
              )}
              
              {rom.bugs && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {t('rom.knownIssues')}
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      whiteSpace: 'pre-line',
                      p: 2,
                      borderRadius: '8px',
                      bgcolor: alpha(theme.palette.error.main, 0.05),
                      border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`
                    }}
                  >
                    {rom.bugs}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions 
        sx={{ 
          p: 2,
          gap: 2,
          bgcolor: alpha(theme.palette.background.paper, 0.5),
          backdropFilter: 'blur(10px)'
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }}
        >
          {t('common.close')}
        </Button>
        {rom.download_links && rom.download_links.length > 0 && (
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            href={rom.download_links[0]}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              '&:hover': {
                transform: 'translateY(-2px)',
              }
            }}
          >
            {t('rom.download')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RomDetailsDialog;
