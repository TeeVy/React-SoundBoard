//server.js
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = module.exports.io = require('socket.io')(server);
const fs = require('fs');

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const detectCategories = () => {
  let categories = [];
  fs.readdirSync('./public/sounds/').forEach(file => {
    categories.push(file);
  });
  return categories;
}

const detectSounds = (soundsFolder) => {
  let sounds = [];
  try {
    fs.readdirSync(soundsFolder).forEach(file => {
      sounds.push(file);
    });
    console.log('fs() success');
    return sounds;
  }
  catch {
    console.log('et oui, c\'est l\'erreur de votre vie');
    sounds = false;
    return sounds;
  }
}

io.on('connection', function(socket){

  console.log('a user connected');
  let categories = detectCategories();
  console.log('Catégories détectées : ' + categories);
  socket.emit('categories', categories);

  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });

  socket.on('category', function (category) {
      console.log('catégorie choisie : ' + category);
      const soundsFolder = './public/sounds/' + category;
      let sounds = detectSounds(soundsFolder);
      socket.emit('sounds', sounds);
  });

});

server.listen(PORT, ()=>{
  console.log('listening on port ' + PORT);
});
