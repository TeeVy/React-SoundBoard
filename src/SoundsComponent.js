import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import Fade from 'react-reveal/Fade';
import Zoom from '@material-ui/core/Zoom';
import { useParams } from 'react-router-dom';
import { socket } from './App';

function SoundsComponent() {

  const { category } = useParams();
  const [sounds, setSounds] = useState('Cette catégorie n\'existe pas.');

  useEffect(() => {
    console.log('CLIENT : Clic sur ' + category);
    socket.emit('category', category);
    socket.once('sounds', function (data) {
      const category = data.category;
      console.log(data.sounds);
      const soundsButtons = data.sounds.map((sound, index) => {
        const audio = new Audio('./sounds/' + category + '/'+ sound);
        const audioName = sound.slice(0, -4);
        const delay = index*100;
        return (
          <Grid item xs={12} md={6} key={sound}>
            <Zoom in={true} style={{ transitionDelay: delay }}>
              <Button variant="contained" color="primary" size="large" fullWidth={true} onClick={() => audio.play()}>{audioName}</Button>
            </Zoom>
          </Grid>
        )
      });
      setSounds(soundsButtons);
    });
  }, [category]);

  return ( sounds );
}

export default SoundsComponent;
