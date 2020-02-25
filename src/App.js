//App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Fade from 'react-reveal/Fade';

//AppBar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

//Menu
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';

const socket = openSocket('192.168.1.120:8000');

function App () {

  const [categories, setCategories] = useState('Aucune categorie détectée.');
  const [category, setCategory] = useState('SoundBoard');
  const [sounds, setSounds] = useState('Aucune catégorie sélectionnée.');

  socket.on('categories', function (categories) {
    console.log('CLIENT : Catégories détectées : ' + categories);
    const categoriesButtons = categories.map((category) =>
      <ListItem button key={category} onClick={() => clickCategory(category)}>
        <ListItemIcon> <VolumeUpRoundedIcon /> </ListItemIcon>
        <ListItemText primary={category} />
      </ListItem>
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
          {categories}
        </List>
      </div>
    );

    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={toggleDrawer('left', true)} edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">{category}</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
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

  function clickCategory(category) {
    console.log('CLIENT : Clic sur ' + category);
    socket.emit('category', category);
    setCategory(category);
  }

  useEffect(() => {
    socket.on('sounds', function (data) {
      const category = data.category;
      console.log('SERVER :');
      console.log('Catégorie : ' + category);
      console.log('Sounds : ' + data.sounds);
      const soundsButtons = data.sounds.map((sound) => {
        const audio = new Audio('./sounds/' + category + '/'+ sound);
        const audioName = sound.slice(0, -4);
        return (
          <Grid item xs={12} md={6} key={sound}>
            <Fade bottom duration={500}>
              <Button variant="contained" color="primary" size="large" fullWidth="true" onClick={() => audio.play()}>{audioName}</Button>
            </Fade>
          </Grid>
        )
      });
      setSounds(soundsButtons);
    });
  }, []);

  return (
		<div style={{ padding: 20 }} className="App">
      <SwipeableTemporaryDrawer />
      <Container>
        <Grid container spacing={2}>
          {sounds}
        </Grid>
      </Container>
		</div>
	);
}

export default App;
