import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from "react-router";

function Header(props) {
  let title = props.location.pathname.split('/')[2];
  if (title === undefined) {
    title = 'Soundboard';
  }
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" onClick={props.toggleDrawer('left', true)} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  )
}

export default withRouter(Header);
