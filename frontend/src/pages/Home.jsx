import { Typography, Box, Card, CardContent, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bucky's Capitol Music Group Skills Test
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Hi it's <strong>Bucky</strong>! I really enjoyed working on this and scaled up a bit so all three parts(functionalities) are fully implemented. Hope you would enjoy reviewing this as much as I coded it. 
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        On this site you can find my answer to all three parts of the UMG Software Engineering skills test.
        You can also find my implementation notes with code references for each part.
      </Typography>

      <Typography variant="body2" sx={{ mb: 4 }}>
        Requirements Recap:
        <ul>
          <li><strong>Part 1</strong>: Create a simple React table component that fetches and displays JSON data returned from an API endpoint</li>
          <li><strong>Part 2</strong>: Implement an API endpoint that accepts and validates user input and stores the validated data in a BigQuery table, focusing on proper validation and error handling</li>
          <li>
            <strong>Part 3</strong>: Implement a feature that allows multiple users to save artists of interest to custom lists. Include:
            <ul>
              <li>The BigQuery table schema(s) to store list information</li>
              <li>An API endpoint to fetch data from the above table(s)</li>
              <li>A React component that displays the fetched data and allows for the deletion or addition of artists</li>
              <li>An explanation of how these three elements work together and any additional considerations for performance or security</li>
            </ul>
          </li>
        </ul>
      </Typography>

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
              A React table that fetches live JSON data from Apple’s iTunes RSS API.
              Includes cover art, artist info, and iTunes links.
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
              🧾 Part 2 – API + BigQuery (Mock Submission)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A FastAPI endpoint validates form input and saves it to BigQuery.
              Handles real-time feedback with full error reporting and live query display.
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
              🎵 Part 3 – Custom Artist Lists
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Multi-user artist list manager with BigQuery backend.  
              Create/view lists, search iTunes for artists, and manage selections.
              Built with modular API and secure design in mind.
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
              View the full repository for this project on GitHub, including frontend, backend, and notes. You can also clone the repo and run it on your local machine. 
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

export default Home;
