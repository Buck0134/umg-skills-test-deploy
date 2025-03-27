import { useEffect, useState } from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, CardActions, Button, Fab, TextField, 
  List, ListItem, ListItemText, Paper, Divider, CircularProgress, Avatar,  Dialog, DialogTitle, 
  DialogContent, DialogActions, CardHeader, Chip, Tooltip, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import UserSelect from '../../components/UserSelect';
import CreateListModal from '../../components/CreateListModal';
import DeleteIcon from '@mui/icons-material/Delete';


// Artist search input using the iTunes API with debounce.
const ArtistSearchInput = ({ onArtistAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      const fetchResults = async () => {
        setLoading(true);
        try {
          const response = await axios.get('https://itunes.apple.com/search', {
            params: {
              term: searchTerm,
              entity: 'musicArtist',
              limit: 15,
            },
          });
          if (response.data && response.data.results) {
            setResults(response.data.results);
          }
        } catch (err) {
          console.error('Error fetching from iTunes API:', err);
        }
        setLoading(false);
      };
      fetchResults();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // When an artist is selected, extract and pass the required details.
  const handleSelect = (artist) => {
    const { artistId, artistName, artistLinkUrl, primaryGenreName} = artist;
    console.log("here ", artist)
    // Simple split: take first word as firstName, the rest as lastName.
    const nameParts = artistName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    onArtistAdd({ artistId, firstName, lastName, profileUrl: artistLinkUrl, primaryGenreName});
    setSearchTerm('');
    setResults([]);
  };
  return (
    <Box width="100%">
      <Box display="flex" alignItems="center">
       <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mr={2}
          sx={{ width: 90, p: 1 }}
        >
          <Typography variant="caption" color="text.secondary" mt={1}>
            Powered by
          </Typography>
          <Avatar
            src="https://upload.wikimedia.org/wikipedia/commons/5/59/Apple_Music_Icon.svg"
            alt="iTunes"
            sx={{ width: 50, height: 50 }}
          />
        </Box>
        <TextField
          label="Search and Add an Artist"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      {loading && (
        <Box sx={{ mt: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
      {results.length > 0 && (
        <Paper sx={{ mt: 2, maxHeight: 300, overflowY: 'auto' }}>
          <List>
            {results.map((artist) => (
              <ListItem 
                key={artist.artistId} 
                button 
                onClick={() => handleSelect(artist)}
              >
                {artist.artworkUrl100 && (
                  <img 
                    src={artist.artworkUrl100} 
                    alt={artist.artistName} 
                    style={{ width: 40, height: 40, marginRight: 8, borderRadius: '50%' }}
                  />
                )}
                <ListItemText primary={artist.artistName} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ p: 1, textAlign: 'right' }}>
            <Typography variant="caption" color="text.secondary">
              Powered by iTunes
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};


const ArtistCard = ({ artist, onDelete, list_id, setModalMessage, setModalOpen }) => {
  // Derive the artist's display name from available fields.
  const firstName = artist.first_name || artist.firstName || '';
  const lastName = artist.last_name || artist.lastName || '';
  const displayName = (firstName || lastName)
    ? `${firstName} ${lastName}`.trim()
    : (artist.name || 'Unknown Artist');

  // Other artist fields.
  const genre = artist.primary_genre_name || 'Unknown Genre';
  const addedBy = artist.added_by_user || 'N/A';
  const addedAt = artist.added_at ? new Date(artist.added_at).toLocaleString() : 'N/A';

  // State to store headshot URL.
  const [headshotUrl, setHeadshotUrl] = useState(null);

  useEffect(() => {
    // Call iTunes API to fetch an album artwork as a headshot substitute.
    const fetchHeadshot = async () => {
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(displayName)}&entity=album&limit=1`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0 && data.results[0].artworkUrl100) {
          // Upgrade image resolution by replacing size in the URL (if applicable).
          const highResImage = data.results[0].artworkUrl100.replace('100x100bb.jpg', '200x200bb.jpg');
          setHeadshotUrl(highResImage);
        }
      } catch (error) {
        console.error('Error fetching headshot:', error);
      }
    };

    fetchHeadshot();
  }, [displayName]);
    // Handle deletion of an artist.
    const handleDelete = async () => {
      try {
        const response = await axios.delete('http://localhost:8000/lists/list/remove-artist', {
          params: { list_id: list_id, artist_id: artist.artist_id }
        });
        if (response.status === 200) {
          if (onDelete) {
            onDelete(artist.artist_id);
          }
        }
      } catch (err) {
        const rawMessage = err?.response?.data?.detail || err.message;
    
        if (
          rawMessage.includes("would affect rows in the streaming buffer")
        ) {
          setModalMessage(
            "⚠️ This artist was added recently and is still in BigQuery’s streaming buffer. Please try deleting again later (usually within 90 minutes). Try delete something I created previously!"
          );
        } else {
          setModalMessage(`Error deleting artist: ${rawMessage}`);
        }
    
        setModalOpen(true);
      }
    };


  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Left side: Avatar and Chip */}
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}
              src={headshotUrl ? headshotUrl : undefined}
            >
              {!headshotUrl && displayName.charAt(0)}
            </Avatar>
            <Chip
              label={
                <Box>
                  <Typography variant="inherit" component="div">
                    {displayName}
                  </Typography>
                  <Typography variant="inherit" component="div">
                    {genre}
                  </Typography>
                </Box>
              }
              sx={{ ml: 2, fontSize: '1.2rem', fontWeight: 'bold', p: 1 }}
            />
          </Box>
          {/* Right side: View Profile button and added info */}
          <Box textAlign="right">
            <Button
              size="small"
              variant="contained"
              color="primary"
              href={artist.profile_url}
              target="_blank"
              sx={{ mb: 1 }}
            >
              View Profile
            </Button>
            <IconButton onClick={handleDelete} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            <Typography variant="body2" color="text.secondary">
              Added by: {addedBy}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {addedAt}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Detail view for a selected list, wrapped in a Card.
const ListDetailView = ({ list, onBack, lists, onSelectList, user }) => {
  // for alerts
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArtists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/lists/list/${list.list_id}/artists`);
      setArtists(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArtists();
  }, [list]);

  // Accepts an artist object from the iTunes search.
  const handleArtistAdd = async (artistData) => {
    // Convert artistId to a string for consistent comparison.
    const artistIdStr = String(artistData.artistId);

    // Check if the artist already exists in the frontend's list.
    if (artists.some(artist => artist.artist_id === artistIdStr)) {
      setModalMessage("Artist already exists in the list. Skipping addition.");
      setModalOpen(true);
      return; // Skip the HTTP call.
    }
    console.log(artistData)
    try {
      const payload = {
        artist_id: artistIdStr,
        first_name: artistData.firstName,
        last_name: artistData.lastName,
        profile_url: artistData.profileUrl,
        list_id: list.list_id,
        added_by: user.name || user.user_id || "unknown",
        primary_genre_name: artistData.primaryGenreName || "unknown"
      };

      console.log("Adding artist with payload:", payload);
      const response = await axios.post("http://localhost:8000/lists/list/add-artist", payload);
      // If the backend confirms the addition, update state.
      if (response && response.data) {
        // console.log(response.data)
        setArtists(prev => [response.data, ...prev]);
      }
      // console.log(artists)
    } catch (error) {
      console.error("Error adding artist:", error);
      setModalMessage("Error adding artist: " + error.message);
      setModalOpen(true);
    }
  };

  // onDelete callback: remove artist from local state
  const handleDeleteArtist = (deletedArtistId) => {
    setArtists(prev => prev.filter(artist => artist.artist_id !== deletedArtistId));
  };

  return (
    <Grid container spacing={2}>
      {/* Left Sidebar */}
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Button variant="text" fullWidth onClick={onBack}>
            All Other Lists
          </Button>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Other Lists
          </Typography>
          <List>
            {lists.filter(l => l.list_id !== list.list_id).map(l => (
              <ListItem key={l.list_id} disablePadding>
                <ListItemText 
                  primary={l.name} 
                  onClick={() => onSelectList(l)}
                  sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      {/* Main Detail Content wrapped in a Card */}
      <Grid item xs={12} md={9}>
        <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {list.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created by: {list.created_by} | Updated: {new Date(list.updated_at).toLocaleString()}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" gutterBottom>
              Artists in this list
            </Typography>
            {loading ? (
              <Typography>Loading artists...</Typography>
            ) : artists.length > 0 ? (
              artists.map(artist => (
                <ArtistCard 
                key={"Unknown Error" || artist.name} 
                artist={artist}
                onDelete={handleDeleteArtist}
                list_id = {list.list_id}
                setModalMessage = {setModalMessage}
                setModalOpen = {setModalOpen}
              />
              ))
            ) : (
              <Typography>No artists found.</Typography>
            )}
          </CardContent>
          <CardActions>
            <ArtistSearchInput onArtistAdd={handleArtistAdd} />
          </CardActions>
        </Card>
      </Grid>
      {/* Modal Dialog for notifications */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
    
  );
};

// Default grid view showing list cards.
const DefaultListsView = ({ lists, onSelectList }) => {
  return (
    <Grid container spacing={3}>
      {lists.map(list => (
        <Grid item xs={12} sm={6} md={4} key={list.list_id}>
          <Card
            sx={{
              cursor: 'pointer',
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.03)' },
            }}
            onClick={() => onSelectList(list)}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {list.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created by: {list.created_by}
              </Typography>
              <Typography variant="caption" display="block">
                Updated: {new Date(list.updated_at).toLocaleString()}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => onSelectList(list)}>
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const Part3CustomLists = () => {
  const [user, setUser] = useState(null);
  const [lists, setLists] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://localhost:8000/lists');
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLists();
    }
  }, [user]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        🎵 Custom Artist Lists
      </Typography>
      <UserSelect onUserSelected={setUser} />

      {user && !selectedList && (
        <Box mt={4}>
          <DefaultListsView lists={lists} onSelectList={setSelectedList} />
        </Box>
      )}

      {user && selectedList && (
        <Box mt={4}>
          <ListDetailView 
            list={selectedList} 
            onBack={() => setSelectedList(null)} 
            lists={lists} 
            onSelectList={setSelectedList} 
            user = {user}
          />
        </Box>
      )}

      {user && (
        <>
          <CreateListModal 
            open={openModal} 
            onClose={() => setOpenModal(false)} 
            onCreated={fetchLists} 
            user={user} 
          />
          <Tooltip title="Add New List">
            <Fab 
              color="primary" 
              aria-label="add" 
              onClick={() => setOpenModal(true)} 
              sx={{ position: 'fixed', bottom: 62, left: 32 }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default Part3CustomLists;