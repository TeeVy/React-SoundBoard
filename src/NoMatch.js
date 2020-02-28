import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import Divider from '@material-ui/core/Divider';

function NoMatch() {
  return (
    <Grid item xs={12}>
      <Typography variant="h3" color="secondary"><ErrorIcon fontSize="large" /> Erreur 404</Typography>
      <Divider />
      <Typography variant="h5">Cette page n'existe pas.</Typography>
    </Grid>
  )
}

export default NoMatch;
