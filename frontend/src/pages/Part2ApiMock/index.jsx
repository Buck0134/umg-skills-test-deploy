import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  Paper,
  Autocomplete,
  Switch,
  FormControlLabel
} from '@mui/material';
import axios from 'axios';

import MusicProfileRecentSubmissions from '../../components/MusicProfileRecentSubmission';

const Part2ApiMock = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    favorite_genre: '',
    monthly_music_hours: '',
  });

  const [errors, setErrors] = useState({});
  const [enableFrontendValidation, setEnableFrontendValidation] = useState(false);

  const handleReset = () => {
    setFormData({
      full_name: '',
      email: '',
      favorite_genre: '',
      monthly_music_hours: '',
    });
    setStatus(null);
    setErrors({});
  };

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [refreshKey, setRefreshKey] = useState(0);

  const handleExternalRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.full_name || formData.full_name.length < 2 || formData.full_name.length > 100) {
      newErrors.full_name = 'Full Name must be between 2 and 100 characters.';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (formData.favorite_genre && formData.favorite_genre.length > 25) {
      newErrors.favorite_genre = 'Favorite genre must be less than 25 characters.';
    }
    const hours = parseInt(formData.monthly_music_hours, 10);
    if (
      isNaN(hours) ||
      formData.monthly_music_hours === '' ||
      !/^[0-9]+$/.test(formData.monthly_music_hours) ||
      hours < 0 ||
      hours > 720
    ) {
      newErrors.monthly_music_hours = 'Must be an integer between 0 and 720.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateCurlCommand = (url, data) => {
    const json = JSON.stringify(data, null, 2);
    return `curl -X POST ${url} \\\n  -H "Content-Type: application/json" \\\n  -d '${json}'`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (enableFrontendValidation && !validateFields()) return;

    try {
      const response = await axios.post('https://umg-deploy-backend.onrender.com/submit/', formData);
      setStatus({
        type: 'success',
        message: response.data.message,
        rawResponse: response
      });
      setTimeout(() => handleExternalRefresh(), 3000);
    } catch (error) {
      const details = error.response?.data?.detail;
      let messageList = ['Unknown error occurred.'];
      if (Array.isArray(details)) {
        messageList = details.map((d) => {
          const field = d.loc?.[1];
          return `${field}: ${d.msg}`;
        });
      } else if (typeof details === 'string') {
        messageList = [details];
      }
      setStatus({
        type: 'error',
        messageList,
        rawResponse: error.response || error
      });
    }
  };

  const genreSuggestions = [
    { label: 'Pop (Valid)', value: 'Pop' },
    { label: 'Rock (Valid)', value: 'Rock' },
    { label: 'EDM (Valid)', value: 'EDM' },
    { label: 'loooooooooooooooong genre name (Invalid)', value: 'loooooooooooooooong genre name' },
    { label: 'Try your own input', value: '' },
  ];

  const nameSuggestions = [
    { label: 'Bucky Yu (Valid)', value: 'Bucky Yu' },
    { label: 'A (Too short)', value: 'A' },
    { label: 'John Smith (Valid)', value: 'John Smith' },
    { label: 'J (Too short)', value: 'J' },
    { label: 'Try your own input', value: '' },
  ];

  const emailSuggestions = [
    { label: 'bucky@example.com (Valid)', value: 'bucky@example.com' },
    { label: 'gradbucky22 (Invalid - Missing @)', value: 'gradbucky22' },
    { label: 'bucky@com (Invalid - Missing domain)', value: 'bucky@com' },
    { label: 'rockfan@mail.com (Valid)', value: 'rockfan@mail.com' },
    { label: 'Try your own input', value: '' },
  ];

  const hourSuggestions = [
    { label: '100 (Valid)', value: '100' },
    { label: '0 (Valid - Edge Case)', value: '0' },
    { label: '720 (Valid - Max Limit)', value: '720' },
    { label: '-1 (Too low)', value: '-1' },
    { label: '999 (Too high)', value: '999' },
    { label: 'Try your own input (type manually)', value: '' }
  ];

  return (
    <Box p={{ xs: 2, md: 4 }} maxWidth="800px" mx="auto">
      <Typography variant="h4" gutterBottom>
        🎯 Submit Music Profile
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={enableFrontendValidation}
            onChange={(e) => setEnableFrontendValidation(e.target.checked)}
          />
        }
        label="Enable Frontend Validation"
      />
      <Paper sx={{ p: 4 }} elevation={3}>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            freeSolo
            options={nameSuggestions}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
            onChange={(e, newValue) => {
              const input = typeof newValue === 'string' ? newValue : newValue?.value || '';
              setFormData(prev => ({ ...prev, full_name: input }));
            }}
            value={formData.full_name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Full Name"
                margin="normal"
                fullWidth
                variant="outlined"
                name="full_name"
                onChange={handleChange}
                error={!!errors.full_name}
                helperText={errors.full_name || ''}
              />
            )}
          />

          <Autocomplete
            freeSolo
            options={emailSuggestions}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
            onChange={(e, newValue) => {
              const input = typeof newValue === 'string' ? newValue : newValue?.value || '';
              setFormData(prev => ({ ...prev, email: input }));
            }}
            value={formData.email}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Email"
                margin="normal"
                fullWidth
                variant="outlined"
                name="email"
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email || ''}
              />
            )}
          />

          <Autocomplete
            freeSolo
            options={genreSuggestions}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
            onChange={(e, newValue) => {
              const input = typeof newValue === 'string' ? newValue : newValue?.value || '';
              setFormData(prev => ({ ...prev, favorite_genre: input }));
            }}
            value={formData.favorite_genre}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Favorite Genre"
                margin="normal"
                fullWidth
                variant="outlined"
                name="favorite_genre"
                onChange={handleChange}
                error={!!errors.favorite_genre}
                helperText={errors.favorite_genre || ''}
              />
            )}
          />

          <Autocomplete
            freeSolo
            options={hourSuggestions}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
            value={formData.monthly_music_hours}
            inputValue={formData.monthly_music_hours}
            onInputChange={(event, newInputValue) => {
              setFormData((prev) => ({ ...prev, monthly_music_hours: newInputValue }));
            }}
            onChange={(e, newValue) => {
              const input = typeof newValue === 'string' ? newValue : newValue?.value || '';
              setFormData(prev => ({ ...prev, monthly_music_hours: input }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="How many hours of music do you listen per month?"
                margin="normal"
                fullWidth
                variant="outlined"
                name="monthly_music_hours"
                error={!!errors.monthly_music_hours}
                helperText={errors.monthly_music_hours || ''}
              />
            )}
          />

          <Box mt={2} display="flex" gap={2}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button type="button" variant="outlined" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </form>
      </Paper>

      {Object.values(formData).some((v) => v) && (
        <Box mt={5}>
          <Typography variant="subtitle1" gutterBottom>
            📡 Sending Request to <code>/submit</code>
          </Typography>
          <Box
            component="pre"
            p={2}
            bgcolor="#f0f4ff"
            borderRadius={2}
            fontSize={14}
            sx={{ overflow: 'auto', maxHeight: 300, whiteSpace: 'pre-wrap' }}
          >
            {generateCurlCommand('https://umg-deploy-backend.onrender.com/submit/', formData)}
          </Box>
        </Box>
      )}

      {status?.type === 'error' && (
        <Alert severity="error" sx={{ mt: 4 }}>
          <Typography fontWeight="bold">Backend Validation Errors:</Typography>
          <ul style={{ paddingLeft: '1.2em', marginTop: '0.5em' }}>
            {status.messageList.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </Alert>
      )}

      {status?.rawResponse && (
        <Box mt={4}>
          <Typography
            variant="subtitle1"
            color={status.type === 'success' ? 'green' : 'error'}
            gutterBottom
          >
            {status.type === 'success' ? '✅ Success Response: Your entry has been recorded in Big Query; Check Blow' : '❌ Error Response:'}
          </Typography>
          <Box
            component="pre"
            p={2}
            bgcolor={status.type === 'success' ? '#e8f5e9' : '#ffebee'}
            border="1px solid"
            borderColor={status.type === 'success' ? '#c8e6c9' : '#ffcdd2'}
            borderRadius={2}
            fontSize={14}
            sx={{
              overflow: 'auto',
              maxHeight: 300,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          >
            {JSON.stringify(status.rawResponse, null, 2)}
          </Box>
        </Box>
      )}

      <MusicProfileRecentSubmissions refreshTrigger={refreshKey} />
      <Button onClick={handleExternalRefresh}>Refresh Table</Button>
    </Box>
  );
};

export default Part2ApiMock;
