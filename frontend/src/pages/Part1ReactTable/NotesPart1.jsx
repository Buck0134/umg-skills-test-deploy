import { Box, Typography, Link, Paper, Divider, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Part1ImplementationNotes = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        📝 Implementation Notes – Part 1
      </Typography>

      <Typography variant="body1" gutterBottom>
        ✅ <strong>Goal:</strong> Create a simple React table component that fetches and displays JSON data returned from an API endpoint.
      </Typography>

      <Typography variant="body1" gutterBottom>
        This component fulfills the requirement of rendering a React table with data from an external API. We used the{' '}
        <Link 
          href="https://performance-partners.apple.com/search-api" 
          target="_blank" 
          rel="noopener noreferrer"
          underline="hover"
        >
          iTunes RSS Feed API
        </Link>{' '}
        to retrieve the top 10 pop songs and presented the data using Material UI’s <code>Table</code> layout, customized for clarity and visual appeal.
      </Typography>

      <Box mt={2} mb={4}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/part-1-react-table"
        >
          🎧 Try Out Live Part 1 Feature
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        🔧 Key Functionalities
      </Typography>
      <ul>
        <li>Fetched real-time data from Apple’s iTunes RSS feed.</li>
        <li>Constructed a clean table using Material UI components like <code>Table</code>, <code>TableRow</code>, and <code>TableCell</code>.</li>
        <li>Used album art as a thumbnail, followed by song metadata in styled rows.</li>
        <li>Each row includes a direct link to the iTunes store for user interaction.</li>
      </ul>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        💡 Code Snippets
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        iTunes API is used to fetch top chart songs 
      </Typography>
      <Paper sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
        {`const fetchTopPopSongs = async (limit = 10) => {
  const url = \`https://itunes.apple.com/us/rss/topsongs/limit=\${limit}/genre=14/json\`;
  const response = await fetch(url);
  const data = await response.json();
  return data.feed.entry || [];
};`}
      </Paper>

      <Typography variant="subtitle1" gutterBottom>
        I used components from Material UI Table for the rendering of the table:
      </Typography>
      <Paper sx={{ p: 2, bgcolor: '#f5f5f5', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
        {`<Table>
  <TableHead>
    <TableRow sx={{ backgroundColor: '#fa233b' }}>
      <TableCell sx={{ color: '#fff' }}>Album Art</TableCell>
      <TableCell sx={{ color: '#fff' }}>Track Name</TableCell>
      <TableCell sx={{ color: '#fff' }}>Artist</TableCell>
      <TableCell sx={{ color: '#fff' }}>Album</TableCell>
      <TableCell sx={{ color: '#fff' }}>iTunes Link</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {songs.map((song, index) => (
      <TableRow key={index}>
        <TableCell>
          <img src={song['im:image']?.[2]?.label} alt="Album Art" style={{ width: 60, borderRadius: 4 }} />
        </TableCell>
        <TableCell>{song['im:name']?.label}</TableCell>
        <TableCell>{song['im:artist']?.label}</TableCell>
        <TableCell>{song['im:collection']?.['im:name']?.label}</TableCell>
        <TableCell>
          <Link href={song.link[0]?.attributes?.href} target="_blank" rel="noopener noreferrer">
            View
          </Link>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
      </Paper>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        🔗 GitHub Source Code
      </Typography>
      <Link href="https://github.com/Buck0134/umg-skills-test/blob/main/frontend/src/pages/Part1ReactTable/index.jsx" target="_blank" rel="noopener">
        React Table – iTunes API Implementation
      </Link>
    </Box>
  );
};

export default Part1ImplementationNotes;