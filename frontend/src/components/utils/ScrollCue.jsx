import { Box, Typography, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ScrollCue = ({ targetId }) => {
  const handleScroll = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'bounce 2s infinite',
        '@keyframes bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      }}
    >
      <Typography variant="caption" sx={{ color: '#777', mb: 1 }}>
        Scroll down
      </Typography>
      <IconButton onClick={handleScroll} size="large" sx={{ color: '#aaa' }}>
        <KeyboardArrowDownIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default ScrollCue;