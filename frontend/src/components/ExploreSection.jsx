import { Box, Typography, Grid, IconButton, Tooltip, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
    color: '#d32f2f',
    isEmail: true,
  },
];

const ExploreSection = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('buckyy@cmu.edu');
    setSnackbarOpen(true);
  };

  return (
    <Box
      id="explore-section"
      sx={{
        width: '100%',
        maxWidth: '100vw',
        minHeight: 'calc(100vh - 64px)',
        bgcolor: '#f9f9f9',
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflowX: 'hidden',
        py: 8,
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 6, color: '#222' }}>
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
                  sx={{
                    width: 280,
                    height: 180,
                    textDecoration: 'none',
                    borderRadius: 4,
                    bgcolor: '#fff',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    p: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: `2px solid transparent`,
                    position: 'relative',
                    '&:hover': {
                      bgcolor: `${action.color}22`,
                      color: '#fff',
                      boxShadow: '0 14px 32px rgba(0,0,0,0.12)',
                      borderColor: action.color,
                    },
                  }}
                >
                  {!action.isEmail ? (
                    action.external ? (
                      <a
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', '&:hover': { color: '#fff' } }}>
                          {action.label}
                        </Typography>
                      </a>
                    ) : action.download ? (
                      <a
                        href={action.href}
                        download={action.download}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', '&:hover': { color: '#fff' } }}>
                          {action.label}
                        </Typography>
                      </a>
                    ) : (
                      <RouterLink
                        to={action.href}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', '&:hover': { color: '#fff' } }}>
                          {action.label}
                        </Typography>
                      </RouterLink>
                    )
                  ) : (
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                        Email Me
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Tooltip title="Send email">
                          <IconButton
                            href="mailto:buckyy@cmu.edu"
                            sx={{ bgcolor: '#f0f0f0', '&:hover': { bgcolor: '#ccc' } }}
                          >
                            <EmailIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Copy email to clipboard">
                          <IconButton
                            onClick={handleCopyEmail}
                            sx={{ bgcolor: '#f0f0f0', '&:hover': { bgcolor: '#ccc' } }}
                          >
                            <ContentCopyIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  )}
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Email copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default ExploreSection;