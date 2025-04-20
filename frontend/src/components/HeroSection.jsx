import { Box, Typography } from '@mui/material';
import ScrollCue from './utils/ScrollCue';

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        bgcolor: '#f9f9f9',
        position: 'relative', // important for cue placement
        px: 3,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 600,
          mb: 2,
          fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
        }}
      >
        Bucky
      </Typography>

      <Typography
        variant="h5"
        sx={{
          color: '#555',
          fontWeight: 400,
          fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
        }}
      >
        Full-Stack Engineer
      </Typography>

      {/* Scroll cue at bottom of Hero section */}
      <Box sx={{ position: 'absolute', bottom: 32 }}>
        <ScrollCue targetId="about-bucky" />
      </Box>
    </Box>
  );
};

export default HeroSection;