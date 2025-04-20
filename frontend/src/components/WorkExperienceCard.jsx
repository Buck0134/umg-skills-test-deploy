import { Box, Typography, Avatar, Stack, Divider, Link } from '@mui/material';
import { motion } from 'framer-motion';

const WorkExperienceCard = ({ id, title, date, stack, bullets, logo, logoLink }) => {
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
          maxWidth: 960,
          mx: 'auto',
          mb: 8,
          p: 5,
          borderRadius: 4,
          bgcolor: '#fff',
          boxShadow: '0 6px 24px rgba(0,0,0,0.05)',
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
            <Typography variant="body2" sx={{ mt: 0.5, fontStyle: 'italic', color: '#666' }}>
              {stack}
            </Typography>
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

        {/* Responsibilities List */}
        <Box component="ul" sx={{ pl: 3, m: 0 }}>
          {bullets.map((point, index) => (
            <li key={index}>
              <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 1 }}>
                {point}
              </Typography>
            </li>
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};

export default WorkExperienceCard;
