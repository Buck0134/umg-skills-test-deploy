import { Box, Typography, Link, Divider, Paper, Grid, Card, CardContent, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Part3Notes = () => {
    const navigate = useNavigate();

  return (
    <Box p={4} maxWidth="900px" mx="auto">
      <Typography variant="h4" gutterBottom>
        🧠 Implementation Notes – Part 3
      </Typography>

      <Typography variant="body1" gutterBottom>
        ✅ <strong>Goal:</strong> Build a feature that allows multiple users to save artists of interest to custom lists. I got excited so I implemented the whole thing end to end.
      </Typography>

      <Typography variant="body1" gutterBottom>
        This feature was implemented using a full-stack approach with React, FastAPI, and BigQuery. Users can select from existing accounts, view or create artist lists, and manage artists using iTunes search. All data is stored across four BigQuery tables (users, artists, lists, artist_in_list), with backend endpoints handling creation, retrieval, and validation. The system supports real-time feedback and is designed to scale with token-based authentication and caching if needed.
      </Typography>

      <Box my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/custom-lists')}
          sx={{ textTransform: 'none' }}
        >
          🎵 Try out Live Part 3 Feature
        </Button>
      </Box>
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        📊 BigQuery Table Schemas
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        The following tables support managing artists, users, custom lists, and the many-to-many relationship between lists and artists.
      </Typography>

      <Grid container spacing={3}>
        {/* Artists Table */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                🎤 Artists Table
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Stores metadata like name, genre, and iTunes profile URL for each artist.
              </Typography>
              <Box
                component="img"
                src="/assets/images/bq_artists.png"
                alt="Artists Table Schema"
                sx={{ width: '100%', borderRadius: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Users Table */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                👤 Users Table
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Maintains user identities for linking actions like list creation and artist additions.
              </Typography>
              <Box
                component="img"
                src="/assets/images/bq_users.png"
                alt="Users Table Schema"
                sx={{ width: '100%', borderRadius: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Lists Table */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                📁 Lists Table
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Represents each custom list, linked to a user and tracks when it was last updated.
              </Typography>
              <Box
                component="img"
                src="/assets/images/bq_lists.png"
                alt="Lists Table Schema"
                sx={{ width: '100%', borderRadius: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Artist In List Table */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                🔗 Artist-In-List Table
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Manages the many-to-many relationship of which artists belong to which lists.
              </Typography>
              <Box
                component="img"
                src="/assets/images/bq_artist_in_list.png"
                alt="Artist-In-List Table Schema"
                sx={{ width: '100%', borderRadius: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Link
            href="https://github.com/Buck0134/umg-skills-test/blob/main/backend/services/bigquery_artist_list.py"
            target="_blank"
            rel="noopener"
          >
            Github Source Code - Big Query CRUD service 
        </Link> 

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">🔧 2. API Endpoints</Typography>
      <Typography mt={1}>
        Key FastAPI endpoints implement CRUD operations across the schema:
      </Typography>
      <ul>
        <li><code>GET /lists</code> – Fetch all custom lists</li>
        <li><code>POST /lists/list</code> – Create a new list</li>
        <li><code>POST /lists/list/add-artist</code> – Add an artist to a list</li>
        <li><code>DELETE /lists/list/remove-artist</code> – Remove artist from list</li>
        <li><code>GET /lists/list/{'{list_id}'}/artists</code> – Get artists in a list</li>
        <li><code>GET /lists/users</code> – Load available users</li>
        <li>Note that api prefix /lists is the functionality name of part3</li>
      </ul>
      <Typography mt={2}>
        Data is validated using <code>Pydantic</code> models and queries are parameterized using BigQuery's job config to ensure safety.
      </Typography>

      <Link
            href="https://github.com/Buck0134/umg-skills-test/blob/main/backend/routers/part3_artist_list_routes.py"
            target="_blank"
            rel="noopener"
          >
            Github Source Code -Part 3 API Routes 
        </Link> 

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">💻 3. React Frontend Flow</Typography>
      <Typography mt={1}>
        The user interface is designed as a flow across 4 main steps, with each step mapped to a specific component:
      </Typography>
      <ol>
        <li>🧑 <strong>UserSelect</strong> – User selects their account</li>
        <li>📋 <strong>DefaultListsView</strong> – View all lists as cards</li>
        <li>🎨 <strong>ListDetailView</strong> – View artists in a selected list</li>
        <li>➕ <strong>ArtistSearchInput</strong> – Add new artists from iTunes (debounced)</li>
      </ol>

      <Typography mt={2}>
        Deletion is handled directly from each artist card via the backend. Each list fetch is real-time and ensures up-to-date display.
      </Typography>

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6">🧩 How the three parts work together?</Typography>
      <Typography mt={2}>
      All three components work together in a modular, full-stack pipeline: the React frontend allows users to select an account, view or create lists, and manage artists through an iTunes-powered search interface. The selected actions are routed through FastAPI endpoints that validate and handle the data, interfacing directly with BigQuery for persistent storage across normalized tables (users, artists, lists, artist_in_list).
      </Typography>

      <Link
            href="https://github.com/Buck0134/umg-skills-test/blob/main/frontend/src/pages/Part3CustomLists/index.jsx"
            target="_blank"
            rel="noopener"
          >
            Github Source Code -Part 3 React Components and Page 
        </Link> 

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6">🧩 Integration Flow</Typography>
      <Card>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            🔗 Data Flow Diagram
          </Typography>
          <Box
            component="img"
            src="/assets/images/data_flow.jpeg"
            alt="Data Flow Diagram"
            sx={{ width: '100%', borderRadius: 2 }}
          />
        </CardContent>
      </Card>
      <ul>
        <li>User selects an account</li>
        <li>User views and manages their custom lists</li>
        <li>Artists are fetched via iTunes and stored in BigQuery</li>
        <li>Many-to-many relationship tracked via artist_in_list</li>
      </ul>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">🚧 Performance Considerations</Typography>
      <ul>
        <li>⚡ Debounced iTunes API search minimizes external calls</li>
        <li>📁 BigQuery queries are only triggered on list interactions</li>
        <li>🚫 Duplicate artists are detected before insertion</li>
        <li>📌 Optionally cache artists in SQLite or Redis for scale</li>
      </ul>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">🔐 Security Considerations</Typography>
      <ul>
        <li>✅ <strong>User traceability</strong> via <code>created_by</code> and <code>added_by_user</code></li>
        <li>🔑 <strong>Safe queries</strong> – Parameterized queries prevent SQL injection</li>
        <li>🔐 <strong>JWT-ready</strong> – Current user system supports future token-based auth</li>
        <li>🧠 <strong>Optional base64</strong> for lightweight obfuscation of sensitive values</li>
      </ul>
    </Box>
  );
};

export default Part3Notes;