import { Box, Typography, Avatar } from '@mui/material';
import ScrollCue from './utils/ScrollCue';

const AboutBuckySection = () => {
  return (
    <Box
      id="about-bucky"
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        bgcolor: '#fff',
        px: 4,
        py: { xs: 4, md: 6 },
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Outer wrapper */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 6, md: 10 },
          maxWidth: 1200,
          width: '100%',
        }}
      >
        {/* Left: Photo and Quote */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: { xs: 200, sm: 240 },
              height: { xs: 200, sm: 240 },
              borderRadius: '50%',
              background: 'radial-gradient(circle at center, #fdfdfd, #e9e9e9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
            }}
          >
            <Avatar
              alt="Bucky Yu"
              src="./../assets/images/bucky.jpeg"
              sx={{
                width: '90%',
                height: '90%',
                borderRadius: '50%',
              }}
            />
          </Box>

          <Typography
            variant="subtitle1"
            sx={{
              fontStyle: 'italic',
              color: '#777',
              maxWidth: 260,
              textAlign: 'center',
            }}
          >
            “Admin systems deserve to be usable and navigable too.”
          </Typography>
        </Box>

        {/* Right: Introduction Text */}
        <Box
          sx={{
            maxWidth: 600,
            bgcolor: '#fdfdfd',
            px: { xs: 3, sm: 5 },
            py: { xs: 4, sm: 6 },
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
            transition: '0.3s',
            textAlign: 'left',
            mx: 'auto',
            '&:hover': {
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
            },
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, fontSize: { xs: '1.6rem', sm: '1.8rem' } }}
          >
            Hello, I’m Bucky.
          </Typography>

          {/* Education Section */}
          <Box
            sx={{
                mt: 3,
                mb: 3,
                p: 2,
                borderLeft: '4px solid #ff9800',
                pl: 2,
                bgcolor: '#fdf5e6', // slightly warmer background to match
                borderRadius: 2,
            }}
            >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              🎓 Education
            </Typography>
                        <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.7 }}>
              <strong>Carnegie Mellon University</strong> (2023–2024)<br />
              M.S. in Software Engineering
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              <strong>Lehigh University</strong> (2019–2023)<br />
              B.S. in Computer Science & Economics
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.9, color: '#444' }}>
            <strong>I understand user needs</strong>, build scalable systems, design APIs, and enjoy turning complex problems into elegant solutions.
            </Typography>

            <Typography
            variant="body1"
            sx={{
                mt: 3,
                fontSize: '1.05rem',
                lineHeight: 1.9,
                color: '#444',
                px: 2,
                py: 1,
                bgcolor: '#f9f9f9',
                borderLeft: '4px solid #ccc',
                borderRadius: 2,
            }}
            >
            My work is grounded in <strong>user empathy</strong> and <strong>stakeholder alignment</strong> —
            ensuring that every solution I build is intuitive, purposeful, and driven by real-world use cases.
            Whether I’m collaborating with product teams or diving into user research,
            I aim to design software that feels seamless and human.
            </Typography>

            <Typography variant="body1" sx={{ mt: 3, fontSize: '1.05rem', lineHeight: 1.9, color: '#444', mb: 1 }}>
            I’ve delivered production-ready solutions using:
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {['React', 'JavaScript', 'Go', 'Python', 'MySQL', 'GraphQL'].map((tech) => (
                <Box
                key={tech}
                component="span"
                sx={{
                    px: 2,
                    py: 0.5,
                    bgcolor: '#e0e0e0',
                    color: '#333',
                    fontSize: '0.85rem',
                    borderRadius: '16px',
                    fontWeight: 500,
                }}
                >
                {tech}
                </Box>
            ))}
            </Box>
        </Box>
      </Box>

      {/* Scroll cue at the bottom of the section */}
      <Box sx={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}>
        <ScrollCue targetId="explore-section" />
      </Box>
    </Box>
  );
};

export default AboutBuckySection;
