import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuIcon from '@mui/icons-material/Menu';

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element,
  window: PropTypes.func,
};

export default function BackToTop(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky" sx={{ backgroundColor: '#2a7f06' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            <Box
              component="img"
              src="assets/logo.png"
              alt="Logo"
              sx={{
                height: 40,
                width: 40,
                marginRight: 1,
                borderRadius: '50%',
              }}
            />
            Crypto Dashboard
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <IconButton sx={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
                <HomeIcon />
                <Typography variant="button" sx={{ marginLeft: 0.5, color: '#fff' }}>
                  Home
                </Typography>
              </IconButton>
            </Link>
            <Link to="/coins" style={{ textDecoration: 'none' }}>
              <IconButton sx={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
                <AccountBalanceWalletIcon />
                <Typography variant="button" sx={{ marginLeft: 0.5, color: '#fff' }}>
                  Coins
                </Typography>
              </IconButton>
            </Link>
          </Box>

          <IconButton color="inherit" edge="end" sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
   
      <Toolbar id="back-to-top-anchor" sx={{ minHeight: 0, height: 0 }} />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top" sx={{ backgroundColor: '#2a7f06', color: '#fff' }}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
