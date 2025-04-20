import { Box, Typography, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box
    component="footer"
    sx={{
        py: 2,
        mt: 'auto',
        borderTop: '1px solid #444',
        textAlign: 'center',
        backgroundColor: '#000',
        color: '#fff',
    }}
    >
    <Typography variant="body2">
        © Bucky Yu, 2025 —{' '}
        <MuiLink
        href="https://www.linkedin.com/in/bucky-yu-5934b9231/"
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        sx={{ color: '#90caf9' }}
        >
        LinkedIn
        </MuiLink>
    </Typography>
    </Box>
  );
};

export default Footer;