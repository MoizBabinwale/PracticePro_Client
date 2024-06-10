import * as React from "react";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useNavigation } from "../context/NavContext";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { TbLogout } from "react-icons/tb";

function Navbar() {
  const { isNavOpen, toggleNav } = useNavigation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isLoggedIn, logout, isPremiumUser, isAdmin } = useContext(AuthContext);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={`nav ${isSearchOpen ? "openSearch" : ""} ${isNavOpen ? "openNav" : ""}`} style={{ zIndex: "999" }}>
      <i className="uil uil-bars navOpenBtn" onClick={toggleNav}>
        <GiHamburgerMenu onClick={() => setIsSearchOpen(false)} />
      </i>
      <Link className="Nav-link-tag logo" to="/">
        Practise Pro
      </Link>
      <ul className="nav-links">
        <i className="uil uil-times navCloseBtn" onClick={toggleNav}>
          <RxCross2 onClick={() => setIsSearchOpen(false)} />
        </i>
        <li onClick={toggleNav}>
          <Link className="Nav-link-tag" to="/">
            Home
          </Link>
        </li>

        {isLoggedIn && (
          <>
            {isAdmin && (
              <>
                <li onClick={toggleNav}>
                  <Link className="Nav-link-tag" to="/createTest">
                    Create Test
                  </Link>
                </li>
                <li onClick={toggleNav}>
                  <Link className="Nav-link-tag" to="/allTests">
                    All Tests
                  </Link>
                </li>
              </>
            )}
            {!isPremiumUser && (
              <li onClick={toggleNav}>
                <Link className="Nav-link-tag" to="/buyPremium">
                  Buy Premium
                </Link>
              </li>
            )}
            <li onClick={toggleNav}>
              <Link className="Nav-link-tag" to="/viewAllTest">
                My Results
              </Link>
            </li>
          </>
        )}
        {isLoggedIn ? (
          <>
            <Link className="Nav-link-tag" to="/giveTest" onClick={toggleNav}>
              Give Test
            </Link>
            <li className=" Nav-link-tag cursor-pointer text-white" onClick={handleLogout}>
              <span className="flex items-center" onClick={toggleNav}>
                Logout <TbLogout className="ml-1" />
              </span>
            </li>
          </>
        ) : (
          <li onClick={toggleNav}>
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
