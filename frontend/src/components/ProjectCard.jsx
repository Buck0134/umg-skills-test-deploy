import { Box, Typography, Stack, Chip, Divider, Button } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { motion } from 'framer-motion';

const categoryColorMap = {
  'Full Stack': 'success',
  'Machine Learning': 'info',
  'Frontend': 'secondary',
  'Network Security': 'warning',
  'CMU': 'default',
  'Team Project': 'primary',
};

const ProjectCard = ({ title, subtitle, tech, bullets, github, categories = [], timePeriod }) => {
  const techArray = tech.split(',').map((item) => item.trim());

  return (
    <motion.div
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
          position: 'relative',
        }}
      >
        {/* Category Chips (top-right) */}
        {categories.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            {categories.map((cat, i) => (
              <Chip
                key={i}
                label={cat}
                size="small"
                color={categoryColorMap[cat] || 'default'}
                sx={{ fontWeight: 500 }}
              />
            ))}
          </Stack>
        )}

        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {subtitle}
            </Typography>

            {timePeriod && (
              <Typography variant="body2" sx={{ color: '#777', mt: 0.5 }}>
                {timePeriod}
              </Typography>
            )}

            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
              {techArray.map((techItem, idx) => (
                <Chip key={idx} label={techItem} size="small" variant="outlined" />
              ))}
            </Stack>
          </Box>

          {github && (
            <Button
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHub />}
              variant="outlined"
            >
              GitHub
            </Button>
          )}
        </Stack>

        <Divider sx={{ my: 3 }} />

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

export default ProjectCard;