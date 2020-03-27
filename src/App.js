//App.js
import React, { useState } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header.js';

//Menu
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import ErrorIcon from '@material-ui/icons/Error';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';

//React-Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import NoMatch from './NoMatch';

import SoundsComponent from './SoundsComponent';

let url = openSocket('localhost:8000');

if (process.env.NODE_ENV === 'production') {
  url =  openSocket('/');
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1b4965',
    },
    secondary: {
      main: '#ee6352',
    }
  },
  typography: {
    h3: {
      fontWeight: 500,
    }
  }
});

export function App () {

  const [categories, setCategories] = useState(
    <ListItem button>
      <ListItemIcon>{<ErrorIcon />}</ListItemIcon>
      <ListItemText primary='Aucune catégorie détectée.' />
    </ListItem>
  );

  socket.on('categories', function (categories) {
    console.log('CLIENT : Catégories détectées : ' + categories);
    const categoriesButtons = categories.map((category) =>
      <Link to={'/category/' + category} key={category}>
        <ListItem button>
          <ListItemIcon>{<VolumeUpRoundedIcon />}</ListItemIcon>
          <ListItemText primary={category} />
        </ListItem>
      </Link>
    );
    setCategories(categoriesButtons);
  });

  const useStyles = makeStyles({
    list: {
      width: 250,
    },
  });

  function SwipeableTemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
      left: false,
    });

    const toggleDrawer = (side, open) => event => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      setState({ ...state, [side]: open });
    };

    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <List>
          <Link to={'/'}>
            <ListItem button>
              <ListItemIcon>{<HomeIcon />}</ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          {categories}
        </List>
      </div>
    );

    return (
      <div>
        <Header toggleDrawer={toggleDrawer} />
        <SwipeableDrawer
          open={state.left}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          {sideList('left')}
        </SwipeableDrawer>
      </div>
    );
  }

  return (
    <Router>
  		<div style={{ padding: 20 }} className="App">
        <ThemeProvider theme={theme}>
          <SwipeableTemporaryDrawer />
          <Container>
            <Grid container spacing={2}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/category/:category" children={<SoundsComponent />} />
                <Route path="*">
                  <NoMatch />
                </Route>
              </Switch>
            </Grid>
          </Container>
        </ThemeProvider>
  		</div>
    </Router>
	);
}

export const socket = url;
