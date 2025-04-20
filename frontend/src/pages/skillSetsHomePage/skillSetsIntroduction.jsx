import { Typography, Box, Card, CardContent, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const SkillShowCaseHome = () => {
  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ maxWidth: 800, textAlign: 'center', mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Full-Stack Engineer Skill Showcase
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.75 }}>
          This site highlights a selection of my technical work across both frontend and backend — built with <strong>React</strong> frontend, <strong>Fast API</strong> backend, and <strong>Big Query</strong> as datasource.
          Each section explores a specific functionality I’ve implemented from scratch.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.75 }}>
          You’ll also find implementation notes, design decisions, and relevant code references throughout.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Part 1 Card */}
        <Card
          sx={{
            width: 300,
            border: '1px solid #ccc',
            transition: '0.3s',
            '&:hover': {
              boxShadow: 4,
              borderColor: '#000',
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🎧 Part 1 – React Table (iTunes API)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A responsive table built in React that fetches live data from Apple’s iTunes RSS API.
              Displays album art, artist metadata, and direct links — all styled with Material UI.
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/part-1-react-table" size="small">
              View Part 1
            </Button>
            <Button component={Link} to="/part-1-notes" size="small" color="secondary">
              Notes
            </Button>
          </CardActions>
        </Card>

        {/* Part 2 Card */}
        <Card
          sx={{
            width: 300,
            border: '1px solid #ccc',
            transition: '0.3s',
            '&:hover': {
              boxShadow: 4,
              borderColor: '#000',
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🧾 Part 2 – Form Validation + BigQuery API
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A FastAPI backend endpoint that validates and processes user form input. 
              Stores clean entries into BigQuery with real-time feedback and validation messaging.
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/submit-data" size="small">
              View Part 2
            </Button>
            <Button component={Link} to="/part-2-notes" size="small" color="secondary">
              Notes
            </Button>
          </CardActions>
        </Card>

        {/* Part 3 Card */}
        <Card
          sx={{
            width: 300,
            border: '1px solid #ccc',
            transition: '0.3s',
            '&:hover': {
              boxShadow: 4,
              borderColor: '#000',
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🎵 Part 3 – Custom Artist List Manager
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A multi-user system to create and manage custom artist lists.
              Search the iTunes API, save selections, and organize lists — all backed by a secure API and BigQuery integration.
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/custom-lists" size="small">
              View Part 3
            </Button>
            <Button component={Link} to="/part-3-notes" size="small" color="secondary">
              Notes
            </Button>
          </CardActions>
        </Card>

        {/* GitHub Source Card */}
        <Card
          sx={{
            width: 300,
            border: '1px solid #ccc',
            mt: 3,
            transition: '0.3s',
            '&:hover': {
              boxShadow: 4,
              borderColor: '#000',
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              💻 Source Code on GitHub
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore the full codebase on GitHub, including frontend, backend services, and implementation notes.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              component="a"
              href="https://github.com/Buck0134/umg-skills-test"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Repo
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default SkillShowCaseHome;