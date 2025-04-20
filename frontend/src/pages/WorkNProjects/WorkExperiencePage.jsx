import { Box, Typography, Stack, Tooltip } from '@mui/material';
import WorkExperienceCard from '../../components/WorkExperienceCard';
import TimelineShowcase from '../../components/TimeLinsShowcase';
const experiences = [
  {
    id: 'influxer',
    title: 'Software Engineering Intern, Influxer',
    date: 'June 2024 – August 2024',
    stack: 'Go, React, JavaScript, MySQL, GraphQL',
    bullets: [
      'Developed a key Enterprise System module that reduced external API calls by 90%, boosting operational efficiency.',
      'Engineered backend services using Go with REST APIs and web socket synchronization secured via OAuth 2.0 and JWT.',
      'Optimized Shopify GraphQL queries to reduce payload and bandwidth while improving retrieval speed.',
      'Structured data using MySQL and SQLite for efficient access.',
      'Built a responsive frontend with React, JavaScript, and MUI components.',
      'Migrated infrastructure from Go server to AWS Lambda (Node.js) for scalability.',
    ],
    logo: '/assets/images/influxer.png', 
  },
  {
    id: 'ta',
    title: 'Graduate Teaching Assistant, Carnegie Mellon University',
    date: 'January 2024 – Present',
    stack: 'JavaScript, React, MongoDB, PostgreSQL, HTML, Web Socket',
    bullets: [
      'Mentored students building a real-time emergency response app using React, WebSocket, JWT, and more.',
      'Led Agile standups and applied Scrum in weekly progress cycles.',
      'Guided system architecture, design patterns, and RESTful API development.',
      'Oversaw UI/UX development and secure authentication integration.',
      'Conducted weekly code reviews and QA testing.',
    ],
    logo: '/assets/images/CMU.jpeg', 
  },
  {
    id: 'research',
    title: 'Graduate Research Fellow, Carnegie Mellon University',
    date: 'August 2024 – Present',
    stack: 'Python, Statistical Analysis, React, Data Privacy, Machine Learning',
    bullets: [
      'Analyzed 10+ years of team formation data in software engineering education.',
      'Built a full-stack data analysis platform (React + Python backend) for real-time integration and visualization.',
      'Created data pipelines for anonymization, normalization, and structured storage.',
      'Led meetings with faculty to guide research direction and ensure progress.',
      'Implemented privacy-compliant data handling for sensitive academic records.',
    ],
    logo: '/assets/images/CMU.jpeg', 
  },
];

const WorkLandingPage = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)', bgcolor: '#fafafa', position: 'relative' }}>
      {/* Sidebar Navigation Dots (Right Side) */}
      <Box
        sx={{
            width: 'auto',
            position: 'fixed',
            top: '50%',
            right: 20,
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 3,
            zIndex: 10,
          }}
      >
        {experiences.map((exp) => (
          <Box
            key={exp.id}
            onClick={() => {
              const el = document.getElementById(exp.id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover .dot': {
                transform: 'scale(1.2)',
                bgcolor: '#1976d2',
              },
              '&:hover .label': {
                opacity: 1,
                transform: 'translateX(0)',
              },
            }}
          >
            <Box
              className="label"
              sx={{
                backgroundColor: '#1976d2',
                color: '#fff',
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                fontSize: '0.85rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                opacity: 0,
                transform: 'translateX(10px)',
                transition: 'all 0.3s ease',
              }}
            >
              {exp.title}
            </Box>
            <Box
              className="dot"
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#999',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Full Scrollable Page Content */}
      <Box sx={{ flex: 1, px: { xs: 4, md: 10 }, py: 8, width: '100%' }}>
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 6 }}>
          <Box>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Experience
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444', maxWidth: 700 }}>
              As a <strong>new grad software engineer</strong>, I bring hands-on industry experience in <strong>full-stack development</strong> and <strong>data analytics</strong>, with a strong foundation in building secure, scalable systems and collaborating with cross-functional teams in both academic and startup settings.
            </Typography>
          </Box>
        </Box>

        <TimelineShowcase/>

        {experiences.map((exp) => (
          <Box key={exp.id} id={exp.id} sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 6 }}>
            <WorkExperienceCard
              title={exp.title}
              date={exp.date}
              stack={exp.stack}
              bullets={exp.bullets}
              logo = {exp.logo}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WorkLandingPage;
