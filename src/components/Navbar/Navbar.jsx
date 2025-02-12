import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';import { Link, useLocation } from 'react-router-dom';
import useStyles from './styles';
import Register from '../UserData/Register';

const Navbar = ({ totalItems }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const classes = useStyles();
  const location = useLocation();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
      <Link to='/register'><AccountCircleTwoToneIcon/>Register</Link>
        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      {/* <MenuItem>
        <IconButton component={Link} to="/register" aria-label="Register user" color="inherit">
          <Badge badgeContent={totalItems} color="secondary">
            <AccountCircleIcon />
          </Badge>
        </IconButton>
        <p>Register</p>
      </MenuItem> */}
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            {/* <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> Commerce.js */}
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' && (
          <div className={classes.button}>
            <Link to='/register'><AccountCircleTwoToneIcon/></Link>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* <IconButton component={Link} to="/registerUser" aria-label="Register user" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <AccountCircleIcon />
              </Badge>
            </IconButton> */}
          </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default Navbar;