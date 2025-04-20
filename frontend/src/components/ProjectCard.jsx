import { Box, Typography, Stack, Chip, Divider, Button } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, subtitle, tech, bullets, github, tags = [] }) => {
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
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {subtitle}
            </Typography>
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

        {tags.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
            {tags.map((tag, idx) => (
              <Chip key={idx} label={tag} color="primary" size="small" variant="outlined" />
            ))}
          </Stack>
        )}

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
