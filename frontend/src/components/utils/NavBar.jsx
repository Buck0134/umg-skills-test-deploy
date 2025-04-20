// import { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Menu,
//   MenuItem
// } from '@mui/material';
// import { Link } from 'react-router-dom';

// const NavBar = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [menuKey, setMenuKey] = useState('');

//   const handleClick = (event, key) => {
//     setAnchorEl(event.currentTarget);
//     setMenuKey(key);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setMenuKey('');
//   };

//   const isMenuOpen = (key) => anchorEl && menuKey === key;

//   return (
//     <AppBar position="static" sx={{ backgroundColor: '#000' }}>
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
//           UMG Skills Test
//         </Typography>

//         <Box sx={{ display: 'flex', gap: 2 }}>
//           <Button
//             component={Link}
//             to="/"
//             sx={{ color: '#fff', '&:hover': { backgroundColor: '#333' } }}
//           >
//             Home
//           </Button>

//           {/* Part 1 Dropdown */}
//           <Button
//             sx={{ color: '#fff' }}
//             onClick={(e) => handleClick(e, 'part1')}
//           >
//             Part 1
//           </Button>
//           <Menu
//             anchorEl={anchorEl}
//             open={isMenuOpen('part1')}
//             onClose={handleClose}
//           >
//             <MenuItem component={Link} to="/part-1-react-table" onClick={handleClose}>
//               Live Feature
//             </MenuItem>
//             <MenuItem component={Link} to="/part-1-notes" onClick={handleClose}>
//               Implementation Notes
//             </MenuItem>
//           </Menu>

//           {/* Part 2 Dropdown */}
//           <Button
//             sx={{ color: '#fff' }}
//             onClick={(e) => handleClick(e, 'part2')}
//           >
//             Part 2
//           </Button>
//           <Menu
//             anchorEl={anchorEl}
//             open={isMenuOpen('part2')}
//             onClose={handleClose}
//           >
//             <MenuItem component={Link} to="/submit-data" onClick={handleClose}>
//               Live Feature
//             </MenuItem>
//             <MenuItem component={Link} to="/part-2-notes" onClick={handleClose}>
//               Implementation Notes
//             </MenuItem>
//           </Menu>

//           {/* Part 3 Dropdown */}
//           <Button
//             sx={{ color: '#fff' }}
//             onClick={(e) => handleClick(e, 'part3')}
//           >
//             Part 3
//           </Button>
//           <Menu
//             anchorEl={anchorEl}
//             open={isMenuOpen('part3')}
//             onClose={handleClose}
//           >
//             <MenuItem component={Link} to="/custom-lists" onClick={handleClose}>
//               Live Feature
//             </MenuItem>
//             <MenuItem component={Link} to="/part-3-notes" onClick={handleClose}>
//               Implementation Notes
//             </MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default NavBar;

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skill Showcase', path: '/skill-show-case' },
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Bucky Yu
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#000' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
            Bucky Yu's Portfolio
          </Typography>

          {/* Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{ color: '#fff', '&:hover': { backgroundColor: '#333' } }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavBar;