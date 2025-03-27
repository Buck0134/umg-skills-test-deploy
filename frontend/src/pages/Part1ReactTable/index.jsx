import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, CircularProgress, Box, Link
} from '@mui/material';

const Part1ReactTable = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Local function to fetch data from iTunes RSS API
  const fetchTopPopSongs = async (limit = 10) => {
    const url = `https://itunes.apple.com/us/rss/topsongs/limit=${limit}/genre=14/json`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      return data.feed.entry || [];
    } catch (error) {
      console.error('Error fetching top pop songs:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchTopPopSongs(10)
      .then(setSongs)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        🎧 Part 1 – React Table: Top Pop Chart Hits (via iTunes API)
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        The requirement here is to create a simple React table component that fetches and displays JSON data returned from an API endpoint. 
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
      We are using Apple’s iTunes RSS Feed API to display the top 10 songs in the Pop genre (U.S. store).
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
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
                  <img
                    src={song['im:image']?.[2]?.label || song['im:image']?.[0]?.label}
                    alt="Album Art"
                    style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                  />
                </TableCell>
                  <TableCell>{song['im:name']?.label}</TableCell>
                  <TableCell>{song['im:artist']?.label}</TableCell>
                  <TableCell>{song['im:collection']["im:name"].label || '—'}</TableCell>
                  <TableCell>
                    <Link
                      href={song.link[0]?.attributes?.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on iTunes
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Part1ReactTable;