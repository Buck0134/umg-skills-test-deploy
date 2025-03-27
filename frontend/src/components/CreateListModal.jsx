import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
  } from '@mui/material';
  import { useState } from 'react';
  import axios from 'axios';
  
  const CreateListModal = ({ open, onClose, onCreated, user }) => {
    const [listName, setListName] = useState('');
  
    const handleCreate = async () => {
      try {
        const listId = `list-${Date.now()}`; // basic unique ID logic
        console.log(user);
        await axios.post('http://localhost:8000/lists/list', {
          list_id: listId,
          list_name: listName,
          created_by: user.name,
        });
        onCreated(); // trigger list refresh
        onClose();
      } catch (err) {
        console.error('Failed to create list:', err);
      }
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Create New Artist List</DialogTitle>
        <DialogContent>
          <TextField
            label="List Name"
            fullWidth
            margin="normal"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start' }}>
          <Button onClick={handleCreate} disabled={!listName} variant="contained">
            Create
          </Button>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default CreateListModal;