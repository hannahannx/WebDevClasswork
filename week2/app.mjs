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


app.use(express.urlencoded({extended:false}));

app.set('view engine', 'ejs');

app.get('/artist/:artist.html', (req, res) => {
    const stmt = db.prepare('SELECT * FROM wadsongs WHERE artist=?');
    const results = stmt.all(req.params.artist);
    const songsHTML = results.map ( song => `${song.title} by ${song.artist}, year ${song.year}, quantity ${song.quantity}, price ${song.price}`).join('<br />');
    res.send(`<div style="background-color: blue; color: white"> ${songsHTML} </div>`);
});

//A GET route find a song with a given ID
app.get('/songs/id/:id', (req,res) => {
    try{
        const buySong = db.prepare("SELECT * FROM wadsongs WHERE id=?");
        const results = buySong.all(req.params.id);
        res.json(results);
    }catch (error){
        res.status(500).json({error: error.message});
    }
});

//A POST route to add a new song;
app.post('/songs/addnewsong/', (req,res) =>{
    try{
        const newSong = db.prepare('INSERT INTO wadsongs(title,artist,year,downloads,price,quantity) VALUES (?,?,?,?,?,?)')
        const results = newSong.run(req.body.title,req.body.artist,req.body.year,req.body.downloads,req.body.price,req.body.quantity)
        res.json({id: newSong.lastInsertRowId});
    }catch(error){
        res.status(500).json({error: error.message})
    }
});

//A PUT route to change the quantity and price of an existing song.
app.put('/songs/update/:id', (req,res) => {
    try{
        const stmt = db.prepare('UPDATE wadsongs SET quantity=?,price=? WHERE id=?')
        //body is for the json and params is for the url
        const results = stmt.run(req.body.quantity, req.body.price, req.params.id);
        res.status(results.changes ? 200:404).json({success: results.changes ? true: false});
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

app.listen(3100);
