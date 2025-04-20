import { useState } from 'react';
import { Box, Typography, Avatar, Stack, Divider, Link, IconButton, Tooltip, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const WorkExperienceCard = ({ id, title, date, stack, bullets, logo, logoLink }) => {
  const [showDetails, setShowDetails] = useState(false);
  const stackArray = stack.split(',').map((tech) => tech.trim());

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 800,
          mx: 'auto',
          mb: 8,
          p: 5,
          borderRadius: 4,
          bgcolor: '#fff',
          boxShadow: '0 6px 24px rgba(0,0,0,0.05)',
          height: { xs: '35vh', md: '45vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Header with basic info and logo on the right */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {date}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
              {stackArray.map((tech, i) => (
                <Chip key={i} label={tech} size="small" variant="outlined" />
              ))}
            </Stack>
          </Box>
          {logo && (
            <Link href={logoLink} target="_blank" rel="noopener noreferrer">
              <Avatar
                src={logo}
                alt="Company Logo"
                variant="rounded"
                sx={{ width: 80, height: 80, bgcolor: '#eee' }}
              />
            </Link>
          )}
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Flip-style content */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {!showDetails ? (
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  fontWeight: 600,
                  fontStyle: 'italic',
                  textAlign: 'center',
                }}
              >
                {bullets[0]}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Tooltip title="Show details">
                  <IconButton
                    onClick={() => setShowDetails(true)}
                    sx={{ border: '1px solid #ccc', bgcolor: '#f5f5f5', '&:hover': { bgcolor: '#e0e0e0' } }}
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                {bullets.slice(1).map((point, index) => (
                  <li key={index}>
                    <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 1 }}>
                      {point}
                    </Typography>
                  </li>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Tooltip title="Back to summary">
                  <IconButton
                    onClick={() => setShowDetails(false)}
                    sx={{ border: '1px solid #ccc', bgcolor: '#f5f5f5', '&:hover': { bgcolor: '#e0e0e0' } }}
                  >
                    <ArrowBackIosNewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default WorkExperienceCard;
