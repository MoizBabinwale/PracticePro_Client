import * as React from "react";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useNavigation } from "../context/NavContext";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';

function Navbar() {
  const { isNavOpen, toggleNav } = useNavigation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isLoggedIn, logout, isPremiumUser } = useContext(AuthContext);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <nav className={`nav ${isSearchOpen ? "openSearch" : ""} ${isNavOpen ? "openNav" : ""}`}>
      <i className="uil uil-bars navOpenBtn" onClick={toggleNav}>
        <GiHamburgerMenu onClick={() => setIsSearchOpen(false)} />
      </i>
      <Link className="Nav-link-tag logo" to="/">
        Practice Pro
      </Link>
      <ul className="nav-links">
        <i className="uil uil-times navCloseBtn" onClick={toggleNav}>
          <RxCross2 onClick={() => setIsSearchOpen(false)} />
        </i>
        <li>
          <Link className="Nav-link-tag" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="Nav-link-tag" to="/viewAllTest">
            All Results
          </Link>
        </li>

        {isLoggedIn && (
          <>
            <li>
              <Link className="Nav-link-tag" to="/createTest">
                Create Test
              </Link>
            </li>
            {!isPremiumUser && (
              <li>
                <Link className="Nav-link-tag" to="/buyPremium">
                  Buy Premium
                </Link>
              </li>
            )}
          </>
        )}
        {isLoggedIn ? (
          <>
            <li className=" Nav-link-tag cursor-pointer text-white" onClick={logout}>
              Logout
            </li>
            <Link className="Nav-link-tag" to="/giveTest">
              Give Test
            </Link>
          </>
        ) : (
          <li>
            <Link className="Nav-link-tag" to="/login">
              Login
            </Link>
          </li>
        )}
      </ul>
      <i className={`uil ${isSearchOpen ? "uil-times" : "uil-search"} search-icon`} id="searchIcon" onClick={toggleSearch}>
        {isSearchOpen ? <RxCross2 /> : <IoIosSearch />}
      </i>
      <div className="search-box">
        <input className="bg-white" type="text" placeholder="Search here..." />
        <i className="uil uil-search search-icon">
          <IoIosSearch />
        </i>

        {/* <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment> */}
      </div>
    </nav>
  );
}

export default Navbar;
