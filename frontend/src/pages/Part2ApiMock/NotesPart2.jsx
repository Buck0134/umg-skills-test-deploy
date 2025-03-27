import { Box, Typography, Paper, Link, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Part2Notes = () => {
    const navigate = useNavigate();

  return (
    <Box p={4} maxWidth="900px" mx="auto">
      <Typography variant="h4" gutterBottom>
        🧠 Implementation Notes – Part 2
      </Typography>

      <Typography variant="body1" gutterBottom>
        This section outlines how I implemented Part 2 of the UMG skills test:
      </Typography>

      <Typography variant="h6" mt={3}>
        ✅ Goal:
      </Typography>
      <Typography>
        Implement a FastAPI endpoint that accepts and validates user input and stores the validated data in a BigQuery table. The focus is on proper validation and error handling.
      </Typography>

      <Box my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/submit-data')}
          sx={{ textTransform: 'none' }}
        >
          🎵 Try and Test Live Part 2 Feature
        </Button>
      </Box>
      <Divider sx={{ my: 3 }} />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">🔧 Backend Stack:</Typography>
      <ul>
        <li><strong>FastAPI</strong> for defining and routing the endpoint.</li>
        <li><strong>Pydantic</strong> for input validation with detailed constraints.</li>
        <li><strong>Google Cloud BigQuery</strong> for persistent structured storage.</li>
      </ul>

      <Typography variant="h6" mt={3}>📩 Endpoint Details:</Typography>
      <Typography><code>POST /submit/</code></Typography>
      <Typography>
        Accepts a JSON body with the following schema:
      </Typography>
      <ul>
        <li><code>full_name</code>: string, required, 2–100 characters</li>
        <li><code>email</code>: string, required, must be a valid email</li>
        <li><code>favorite_genre</code>: string, optional, max 25 characters</li>
        <li><code>monthly_music_hours</code>: integer, required, between 0–500</li>
      </ul>

      <Typography mt={2}>
        Input validation errors return detailed field-level messages. Valid entries are inserted into BigQuery along with a UUID and UTC timestamp.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">🗄️ BigQuery Integration</Typography>
      <Typography>
        Using the Google Cloud Python SDK, data is inserted into the following table:
      </Typography>
      <Typography mt={1}><code>tonal-premise-454821-k0.umg_data.music_profiles</code></Typography>

      <ul>
        <li>Each record includes: <code>id</code> (UUID), <code>full_name</code>, <code>email</code>, <code>favorite_genre</code>, <code>monthly_music_hours</code>, <code>timestamp</code>.</li>
        <li>All credentials are loaded securely via <code>.env</code>.</li>
        <li>If the insert fails, the error message and attempted payload are returned to the frontend.</li>
      </ul>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">🔁 Frontend Testing Interface</Typography>
      <Typography>
        I designed a frontend React page that connects directly to the FastAPI endpoint to demonstrate:
      </Typography>
      <ul>
        <li>Live field-level error feedback from backend</li>
        <li>Visual preview of the HTTP request and response</li>
        <li>Autocomplete + suggestions for testing edge cases</li>
        <li>Live BigQuery viewer (via an internal GET endpoint)</li>
      </ul>

      <Typography mt={2}>
        The frontend logic is designed for testers to fully evaluate how well the API handles both valid and invalid input in a controlled way.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">📎 GitHub Source Code</Typography>
      <ul>
        <li>
          <Link
            href="https://github.com/Buck0134/umg-skills-test/blob/main/backend/routers/submit_data_api.py"
            target="_blank"
            rel="noopener"
          >
            Backend Route – FastAPI `/submit`
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/Buck0134/umg-skills-test/blob/main/backend/services/submit_data_api_bq.py"
            target="_blank"
            rel="noopener"
          >
            BigQuery Logic – `submit_data_api_bq.py`
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/Buck0134/umg-skills-test/blob/main/frontend/src/pages/Part2ApiMock/index.jsx"
            target="_blank"
            rel="noopener"
          >
            Frontend Submission Page – `Part2ApiMock/index.jsx`
          </Link>
        </li>
      </ul>
    </Box>
  );
};

export default Part2Notes;
