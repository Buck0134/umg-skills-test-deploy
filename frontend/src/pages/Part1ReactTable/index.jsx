import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, CircularProgress, Box, Link, TextField, Pagination, Stack
} from '@mui/material';

const Part1ReactTable = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);
  const [inputValue, setInputValue] = useState('10'); // buffer input
  const [page, setPage] = useState(1);

  const fetchTopPopSongs = async (limit = 10) => {
    const url = `https://itunes.apple.com/us/rss/topsongs/limit=${limit}/genre=14/json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.feed.entry || [];
    } catch (error) {
      console.error('Error fetching top pop songs:', error);
      return [];
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTopPopSongs(limit)
      .then((data) => {
        setSongs(data);
        setPage(1); // reset page if limit changes
      })
      .finally(() => setLoading(false));
  }, [limit]);

  const songsPerPage = 5;
  const filtered = songs.filter((song) =>
    song['im:name']?.label.toLowerCase().includes(search.toLowerCase()) ||
    song['im:artist']?.label.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * songsPerPage, page * songsPerPage);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        🎧 Part 1 – React Table: Top Pop Chart Hits (via iTunes API)
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        The requirement here is to create a simple React table component that fetches and displays JSON data returned from an API endpoint.
        We are using Apple’s iTunes RSS Feed API to display the top songs in the Pop genre (U.S. store).
      </Typography>

      {/* Controls */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mt={3} mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          label="Total Songs to Load"
          type="number"
          size="small"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onBlur={() => {
            const num = parseInt(inputValue);
            if (!isNaN(num) && num > 0) {
              setLimit(num);
            } else {
              setInputValue(limit.toString()); // revert to valid
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const num = parseInt(inputValue);
              if (!isNaN(num) && num > 0) {
                setLimit(num);
              } else {
                setInputValue(limit.toString());
              }
            }
          }}
          sx={{ width: 180 }}
        />
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#fa233b' }}>
                  <TableCell sx={{ color: '#fff' }}>Rank</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Album Art</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Track Name</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Artist</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Album</TableCell>
                  <TableCell sx={{ color: '#fff' }}>iTunes Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((song, index) => (
                  <TableRow key={index}>
                    <TableCell>{(page - 1) * songsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={song['im:image']?.[2]?.label || song['im:image']?.[0]?.label}
                        alt="Album Art"
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                      />
                    </TableCell>
                    <TableCell>{song['im:name']?.label}</TableCell>
                    <TableCell>{song['im:artist']?.label}</TableCell>
                    <TableCell>{song['im:collection']?.['im:name']?.label || '—'}</TableCell>
                    <TableCell>
                      <Link
                        href={song.link?.[0]?.attributes?.href}
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

          {filtered.length > songsPerPage && (
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(filtered.length / songsPerPage)}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Part1ReactTable;