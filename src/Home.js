import React from 'react';
import Grid from '@material-ui/core/Grid';

function Home(props) {

  return (
    <Grid item xs={12} align="left">
      Bienvenue sur votre SoundBoard.<br />
      Commmencez par cliquer sur le Menu (ou swipez vers la droite) pour sélectionner une catégorie !
    </Grid>
  )
}

export default Home;
