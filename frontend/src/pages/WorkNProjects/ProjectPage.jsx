import { Box, Typography, Stack, Tooltip, Chip } from '@mui/material';
import ProjectCard from '../../components/ProjectCard';

const projects = [
  {
    id: 'incident-response',
    title: 'Incident Response Product',
    subtitle: 'Web Application for Emergency Management',
    tech: 'TypeScript, Node.js, React, Docker, TypeORM, MySQL, Swagger, SonarQube, ESLint',
    github: '',
    categories: ['Full Stack', 'CMU'],
    timePeriod: 'Jan 2024 – May 2024',
    bullets: [
      'Led backend development for a mobile emergency response platform using TypeScript, Node.js, and TypeORM (MySQL).',
      'Built responsive frontend in React and implemented scalable CI/CD pipelines with Docker, SonarQube, and ESLint.',
      'Managed a sub-team of 5 to streamline coordination across citizens and responders, improving operational response time.',
      'Used TSOA and Swagger for auto-generating API documentation, boosting dev efficiency.',
    ],
  },
  {
    id: 'neighborly-app',
    title: 'Neighborly App',
    subtitle: 'Social & Utility Platform for Apartment Communities',
    tech: 'Node.js, React, MUI, TailwindCSS, IndexedDB, Amazon S3',
    github: 'https://github.com/cmusv/neighborly',
    categories: ['Frontend', 'CMU'],
    timePeriod: 'Jan 2024 – May 2024',
    bullets: [
      'Interviewed over 40 apartment renters in the Bay Area to gather insights on pain points and community engagement.',
      'Designed and developed a modern, user-centric web app reimagining social life in large apartment complexes.',
      'Implemented responsive frontend with React, styled using MUI and TailwindCSS.',
      'Focused heavily on intuitive user flow, reducing interaction friction with minimalist design and seamless transitions.',
      'Tested traction through landing page + ad campaign (LinkedIn, Twitter, Instagram); achieved a 12% conversion rate.',
      'Used Amazon S3 for file storage and Google Analytics to monitor user behavior and engagement.',
    ],
  },
  {
    id: 'pull-approval-predictor',
    title: 'Pull Request Approval Classifier',
    subtitle: 'Machine Learning Model for GitHub CI',
    tech: 'Python, Flask, SMOTE, Grid Search, ML Classification',
    github: 'https://github.com/Buck0134/PR_Prediction',
    categories: ['Machine Learning', 'Backend', 'CMU'],
    timePeriod: 'Mar 2024 – Apr 2024',
    bullets: [
      'Built a Flask-based prediction service for GitHub PR approvals using ML classifiers.',
      'Performed data cleaning, validation, and balancing using SMOTE; improved model precision while reducing F1 inflation by 5%.',
      'Applied grid search hyperparameter tuning and achieved an 8% boost in approval prediction accuracy.',
    ],
  },
  {
    id: 'ddos-detection',
    title: 'DDoS Attack Analysis and Detection',
    subtitle: 'Network Forensics Project on Raspberry Pi',
    tech: 'Python, TCP/IP, hping3, Wireshark, SNORT',
    github: '',
    categories: ['Network Security', 'CMU'],
    timePeriod: 'Nov 2023 – Dec 2023',
    bullets: [
      'Simulated a DDoS SYN flood attack on an IoT device using hping3 and Raspberry Pi.',
      'Analyzed traffic patterns using Wireshark and used SNORT for intrusion detection and real-time alerting.',
    ],
  },
  {
    id: 'emergency-social',
    title: 'Emergency Social Network',
    subtitle: 'Full-Stack Crisis Communication Platform',
    tech: 'JavaScript, HTML, CSS, MongoDB, JWT, CI/CD',
    github: '',
    categories: ['Full Stack', 'CMU'],
    timePeriod: 'Aug 2023 – Dec 2023',
    bullets: [
      'Built an emergency-focused social network with a user-centric frontend and scalable backend infrastructure.',
      'Implemented RESTful API in Node.js, integrated MongoDB, and secured sessions with JWT.',
      'Applied Agile methodologies and used design patterns (Observer, Bridge) for maintainability.',
      'Led architectural planning with sequence/class diagrams and CI/CD pipelines with Git.',
      'Wrote over 120 unit/integration tests, achieving 80% branch coverage.',
    ],
  },
];

const ProjectLandingPage = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)', bgcolor: '#fafafa', position: 'relative' }}>
      {/* Dot Sidebar on Right */}
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
        {projects.map((proj) => (
          <Box
            key={proj.id}
            onClick={() => {
              const el = document.getElementById(proj.id);
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
              {proj.title}
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

      {/* Scrollable Full Page Layout */}
      <Box sx={{ flex: 1, px: { xs: 4, md: 10 }, py: 8, width: '100%' }}>
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 6 }}>
          <Box>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Projects
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444', maxWidth: 700, mb: 2 }}>
              Here are a few selected projects showcasing my skills in full-stack development, cloud architecture,
              and interactive frontend experiences.
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {[
                'React', 'Node.js', 'TypeScript', 'MongoDB', 'MySQL', 'Flask', 'Python', 'Docker', 'TailwindCSS', 'JWT',
              ].map((tech, idx) => (
                <Tooltip key={idx} title={`Used in multiple projects`}>
                  <Chip
                    label={tech}
                    color="primary"
                    variant="outlined"
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.85rem',
                      transition: '0.2s',
                      '&:hover': {
                        bgcolor: '#1976d2',
                        color: '#fff',
                      },
                    }}
                  />
                </Tooltip>
              ))}
            </Stack>
          </Box>
        </Box>

        {projects.map((proj) => (
          <Box key={proj.id} id={proj.id} sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 6 }}>
            <ProjectCard
              title={proj.title}
              subtitle={proj.subtitle}
              tech={proj.tech}
              bullets={proj.bullets}
              github={proj.github}
              categories={proj.categories}
              timePeriod={proj.timePeriod}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectLandingPage;