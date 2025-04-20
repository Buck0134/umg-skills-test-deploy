import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ScrollCue from './utils/ScrollCue';
import { AnimatePresence, motion } from 'framer-motion';

const HeroSection = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1200),
      setTimeout(() => setStep(2), 2200),
      setTimeout(() => setStep(3), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        px: 3,
        textAlign: 'center',
        overflow: 'hidden',
        bgcolor: '#f9f9f9',
      }}
    >
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="hi"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '4rem', sm: '5rem', md: '6rem' },
                letterSpacing: 1,
              }}
            >
              Hi 👋
            </Typography>
          </motion.div>
        )}

        {step >= 1 && (
          <motion.div
            key="lines"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '2rem',
              height: '12rem',
              justifyContent: 'space-between',
            }}
          >
            {/* Line 1 */}
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography variant="body1" sx={{ fontSize: '1.5rem', color: '#666' }}>
                I am
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                }}
              >
                Bucky
              </Typography>
            </Box>

            {/* Line 2 */}
            <Box
              sx={{
                display: step >= 2 ? 'flex' : 'none',
                alignItems: 'baseline',
                gap: 1,
              }}
            >
              <Typography variant="body1" sx={{ fontSize: '1.5rem', color: '#666' }}>
                a
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  cursor: 'default',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '2px',
                    bottom: 0,
                    left: 0,
                    bgcolor: '#1976d2',
                    transition: 'width 0.3s ease-in-out',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  }}
                >
                  Full Stack Engineer
                </Typography>
              </Box>
            </Box>

            {/* Line 3 */}
            <Box
              sx={{
                display: step >= 3 ? 'flex' : 'none',
                alignItems: 'baseline',
                gap: 1,
              }}
            >
              <Typography variant="body1" sx={{ fontSize: '1.5rem', color: '#666' }}>
                in
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                }}
              >
                Bay Area, CA
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll cue at the bottom */}
      <Box sx={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}>
        <ScrollCue targetId="about-bucky" />
      </Box>
    </Box>
  );
};

export default HeroSection;