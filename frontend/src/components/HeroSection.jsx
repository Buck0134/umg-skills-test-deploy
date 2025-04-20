import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ScrollCue from './utils/ScrollCue';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
    const [step, setStep] = useState(0);
  
    useEffect(() => {
      const timers = [
        setTimeout(() => setStep(1), 1000),
        setTimeout(() => setStep(2), 2000),
        setTimeout(() => setStep(3), 3000),
        setTimeout(() => setStep(4), 4000),
      ];
      return () => timers.forEach(clearTimeout);
    }, []);
  
    return (
      <Box
        sx={{
            minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          bgcolor: '#f9f9f9',
          position: 'relative',
          px: 3,
        }}
      >
        {/* Reserve space to avoid layout shift */}
        <Box sx={{ minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-40px)',}}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 0 && step < 1 ? 1 : 0, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '3.5rem', sm: '5rem', md: '6rem' },
                minHeight: '80px',
                opacity: step >= 1 ? 0 : 1,
              }}
            >
              Hi 👋
            </Typography>
          </motion.div>
  
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                }}
              >
                <span style={{ fontWeight: 300, fontSize: '70%' }}>I am </span>
                Bucky
              </Typography>
            </motion.div>
          )}
  
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h5"
                sx={{
                  mt: 2,
                  fontWeight: 500,
                  fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
                  position: 'relative',
                  display: 'inline-block',
                  '&:hover::after': {
                    width: '100%',
                  },
                  '::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: -4,
                    width: 0,
                    height: 2,
                    bgcolor: '#1976d2',
                    transition: 'width 0.3s ease-in-out',
                  },
                }}
              >
                <span style={{ fontWeight: 300, fontSize: '70%' }}>a </span>
                Full Stack Engineer
              </Typography>
            </motion.div>
          )}
  
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h6"
                sx={{
                  mt: 2,
                  color: '#666',
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                }}
              >
                <span style={{ fontWeight: 300, fontSize: '70%' }}>in </span>
                Bay Area, CA
              </Typography>
            </motion.div>
          )}
        </Box>
  
        {/* Scroll cue at the bottom */}
        <Box sx={{ position: 'absolute', bottom: 32 }}>
          <ScrollCue targetId="about-bucky" />
        </Box>
      </Box>
    );
  };
  
  export default HeroSection;