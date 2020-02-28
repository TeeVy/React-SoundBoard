import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';

function Home() {
  return (
    <Grid item xs={12} align="left">
      Bienvenue sur votre SoundBoard.<br />
      Commmencez par cliquer sur le menu <MenuIcon /> (ou swipez vers la droite) pour sélectionner une catégorie !
    </Grid>
  )
}

export default Home;
