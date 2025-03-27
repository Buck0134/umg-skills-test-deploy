import { useEffect, useState } from 'react';
import {
  Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Paper, Box, CircularProgress
} from '@mui/material';
import axios from 'axios';

const MusicProfileRecentSubmissions = ({ refreshTrigger }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/submit/submissions?limit=10');
      setRows(res.data);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]); // <-- watch for prop change

  return (
    <Box mt={6}>
      <Typography variant="h5" gutterBottom>
        🎼Live Data Feed from BigQuery
      </Typography>

      <Paper>
        {loading ? (
          <Box p={4} textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Genre</strong></TableCell>
                <TableCell><strong>Monthly Hours</strong></TableCell>
                <TableCell><strong>Submitted At</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.full_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.favorite_genre}</TableCell>
                  <TableCell>{row.monthly_music_hours}</TableCell>
                  <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
};

export default MusicProfileRecentSubmissions;