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
        position: 'relative', // enable absolute scroll cue
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

          <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.9, color: '#444' }}>
            I’m a full-stack engineer with a background in <strong>Computer Science</strong> and Economics,
            currently finishing up my study at <strong>Carnegie Mellon University</strong> as a Master Student in Software Engineering.
            I understand user needs, build scalable systems, design APIs, and enjoy turning complex problems into elegant solutions.
          </Typography>

          <Typography variant="body1" sx={{ mt: 3, fontSize: '1.05rem', lineHeight: 1.9, color: '#444' }}>
            My work is grounded in understanding the needs of both end users and stakeholders —
            ensuring that every solution I build is intuitive, purposeful, and driven by real-world use cases.
            Whether I’m collaborating with product teams or diving into user research, I aim to design software that feels seamless and human.
          </Typography>

          <Typography variant="body1" sx={{ mt: 3, fontSize: '1.05rem', lineHeight: 1.9, color: '#444' }}>
            I’ve worked with startups and research teams to deliver production-ready solutions using technologies like <strong>React</strong>, <strong>Go</strong>, <strong>Python</strong>, and <strong>GraphQL</strong>.
            Outside of work, I enjoy capturing life on film. You can check out my photography account <a href="https://your-link.com" target="_blank" rel="noopener noreferrer">here</a>.
          </Typography>
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