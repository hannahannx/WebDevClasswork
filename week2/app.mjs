//importing modules to use
import express from 'express';
import Database from 'better-sqlite3';
import fetch from 'node-fetch';
/*when you import a module which you do not use
this may cause an error in your server connection
*/ 

//creating application variables
const app = express();
const db = new Database("wadsongs.db");

app.set('view engine', 'ejs');

app.get('/artist/:artist.html', (req, res) => {
    const stmt = db.prepare('SELECT * FROM wadsongs WHERE artist=?');
    const results = stmt.all(req.params.artist);
    const songsHTML = results.map ( song => `${song.title} by ${song.artist}, year ${song.year}, quantity ${song.quantity}, price ${song.price}`).join('<br />');
    res.send(`<div style='background-color: blue; color: white'>${songsHTML}</div>`);
});

app.get('/', (req,res) => {
    const response = fetch("http://localhost:3100/artist/Leona%20Lewis")
    .then(response => response.json())
    .then(songs => {
        res.render('index' , {songs: songs});
    });
});


app.listen(3100);
