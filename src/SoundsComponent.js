import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import { useParams, useHistory } from 'react-router-dom';
import { socket } from './App';
import CircularProgress from '@material-ui/core/CircularProgress';

function SoundsComponent() {

  const { category } = useParams();
  let history = useHistory();
  const [sounds, setSounds] = useState(
    <Grid item xs={12}>
      <CircularProgress />
    </Grid>
  );

  useEffect(() => {
    console.log('CLIENT : Clic sur ' + category);
    socket.emit('category', category);
    socket.once('sounds', function (sounds) {
      console.log(sounds);
      if (sounds) {
        const soundsButtons = sounds.map((sound, index) => {
          const audio = new Audio('/sounds/' + category + '/'+ sound);
          const audioName = sound.slice(0, -4);
          const delay = index*100;
          return (
            <Grid item xs={12} md={6} key={sound}>
              <Zoom in={true} style={{ transitionDelay: delay }}>
                <Button variant="contained" color="secondary" size="large" fullWidth={true} onClick={() => audio.play()}>{audioName}</Button>
              </Zoom>
            </Grid>
          )
        });
        setSounds(soundsButtons);
      } else {
        history.push("/404");
      }
    });
  }, [category,history]);

  return (sounds);
}

export default SoundsComponent;
