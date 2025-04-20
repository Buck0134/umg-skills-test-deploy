import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const actions = [
  { label: 'Work Experience', href: '/work', color: '#1976d2' },
  { label: 'Projects', href: '/projects', color: '#9c27b0' },
  {
    label: 'Resume',
    href: '/assets/BUCKYYU_calcareer.pdf',
    download: 'Bucky_Yu_Resume.pdf',
    color: '#2e7d32',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bucky-yu-5934b9231/',
    external: true,
    color: '#0288d1',
  },
  {
    label: 'Photography',
    href: 'https://www.instagram.com/film.bybucky/?locale=zh_CN&hl=am-et',
    external: true,
    color: '#f9a825',
  },
  {
    label: 'Email Me',
    href: 'mailto:buckyy@cmu.edu',
    color: '#d32f2f',
  },
];

const ExploreSection = () => {
  return (
    <Box
      id="explore-section"
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        bgcolor: '#f9f9f9',
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        py: 8,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1080 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 6,
            color: '#222',
          }}
        >
          Learn more about me
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {actions.map((action, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -6 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.1,
                }}
              >
                <Box
                  component="a"
                  href={action.href}
                  target={action.external ? '_blank' : undefined}
                  rel={action.external ? 'noopener noreferrer' : undefined}
                  download={action.download}
                  sx={{
                    width: 280,
                    height: 180,
                    textDecoration: 'none',
                    borderRadius: 4,
                    bgcolor: '#fff',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    transition:
                      'all 0.3s ease, background-color 0.3s ease, color 0.3s ease',
                    p: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: `2px solid transparent`,
                    '&:hover': {
                      bgcolor: `${action.color}22`, // ~13% opacity tint
                      color: '#fff',
                      boxShadow: '0 14px 32px rgba(0,0,0,0.12)',
                      borderColor: action.color,
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#333',
                      transition: 'color 0.3s',
                      '&:hover': { color: '#fff' },
                    }}
                  >
                    {action.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ExploreSection;