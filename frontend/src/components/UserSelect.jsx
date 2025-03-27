import { useEffect, useState } from 'react';
import {
  Box, Typography, Autocomplete, TextField, Avatar, Divider, Button, Tooltip
} from '@mui/material';
import axios from 'axios';

const UserSelect = ({ onUserSelected }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/lists/users');
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Unexpected response format for users:', response.data);
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleUserChange = (user) => {
    setSelectedUser(user);
    onUserSelected(user);
  };

  return (
    <Box mb={4}>
      {!selectedUser ? (
        <Box textAlign="center" mt={6}>
          <Typography variant="h6" gutterBottom>
            👤 Select Your User Account
          </Typography>
          <Box display="flex" justifyContent="center" gap={3} mt={3}>
            {users.map(user => (
              <Box key={user.id} textAlign="center" onClick={() => handleUserChange(user)} sx={{ cursor: 'pointer' }}>
                <Tooltip title={user.name} arrow>
                  <Avatar sx={{ width: 76, height: 76, mx: 'auto' }}>{user.name.split(' ')[0]}</Avatar>
                </Tooltip>
                {/* <Typography variant="caption" mt={1}>{user.name.split(' ')[0]}</Typography> */}
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box position="absolute" top={90} right={16} textAlign="right">
          <Button
            variant="outlined"
            size="small"
            onClick={() => setSelectedUser(null)}
            sx={{
                textTransform: 'none',
                border: '2px solid black',
                color: 'black'
              }}          >
            Signed in as: <strong style={{ marginLeft: 4 }}>{selectedUser.name}</strong>
          </Button>
        </Box>
      )}
      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

export default UserSelect;