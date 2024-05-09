//hitastic.mjs
//server code

// importaning modules to use 
import express from 'express'
import Database from 'better-sqlite3'
import cors from 'cors'

// creating application varibles 
const PORT = 3400;
const app = express();
const db = new Database("wadsongs.db");

//use to read the JSON data from the request body
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));


//WEEK 3 
//search search for artist and return html page
app.get('/artist/:artist.html', (req, res) => {
    const stmt = db.prepare('SELECT * FROM wadsongs WHERE artist=?');
    const results = stmt.all(req.params.artist);
    const songsHTML = results.map ( song => `${song.title} by ${song.artist}, year ${song.year}, quantity ${song.quantity}, price ${song.price}`).join('<br />');
    res.send(`<div style='background-color: blue; color: white'>${songsHTML}</div>`);
});

//homepage route
app.get('/', (req,res) => {
    const response = fetch("http://localhost:3400/index.html") // {for inputted value based on the user input}
    .then(response => response.json())
        res.render('index');
});

//addSongs route 
app.get('/songs/addsong', (req,res) => {
    const response = fetch("http://localhost:3400/addSong.html") // {for inputted value based on the user input}
    .then(response => response.json())
    .then(add => {
        res.render('addSongs' , {add: add});
    });
});

//WEEK 1
// search for all songs given artist 
app.get('/songs/artist/:artist', (req,res) => {
    try{
        const artistSearch = db.prepare("SELECT * FROM wadsongs WHERE artist=?");
        const results = artistSearch.all(req.params.artist);
        res.json(results);
    }catch (error) {
        res.status(500).json({error: error.message });
    }
});

//search for all songs given title
app.get('/songs/title/:title',(req,res)=>{
    try{
        const titleSearch = db.prepare("SELECT * FROM wadsongs WHERE title=?");
        const results = titleSearch.all(req.params.title);
        res.json(results);
    }catch (error) {
        res.status(500).json({error: error.message});
    }
});

//search for all songs by artist and title
app.get('/songs/title/:title/artist/:artist', (req,res)=>{
    try{
        const artistTitleSearch = db.prepare("SELECT * FROM wadsongs WHERE title =? AND artist=?");
        const results = artistTitleSearch.all(req.params.title,req.params.artist);
        res.json(results);
    }catch (error) {
        res.status(500).json({error: error.message});
    }
});

//find a song with a given ID
app.get('/songs/id/:id', (req,res) => {
    try{
        const buySong = db.prepare("SELECT * FROM wadsongs WHERE id=?");
        const results = buySong.all(req.params.id);
        res.json(results);
    }catch (error){
        res.status(500).json({error: error.message});
    }
});


//buy a physical copy of song
app.post('/songs/buy/:id', (req,res) => {
    try{
        const stmt = db.prepare('UPDATE wadsongs SET quantity=(quantity-1) WHERE id=?')
        const results = stmt.run(req.params.id);
        if(results.changes == 1){
            res.json({sucess:1});
        } else {
            res.status(404).json({error: error.message});
        }
        res.json(results);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});


//delete a song given ID
app.post('/songs/delete/:id', (req,res) => {
    try{
        const stmt = db.prepare('DELETE FROM wadsongs WHERE id=?');
        const results = stmt.run(req.params.id);
        if(results.changes == 1){
            res.json({sucess:1});
        } else {
            res.status(404).json({error: error.message});
        }
        res.json(results);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

//WEEK 2 

//A POST route to add a new song;
app.post('/songs/addnewsong/', (req,res) =>{
    try{
        //error checking, if any of the fields are blank then it would return the error message
        if(req.body.title == ""|| req.body.artist == ""|| req.body.year == ""|| req.body.downloads == ""|| req.body.price == ""|| req.body.quantity == ""){
            res.status(400).json({error: "One or more of your fields are blank" });
        }else{
            const newSong = db.prepare('INSERT INTO wadsongs(title,artist,year,downloads,price,quantity) VALUES (?,?,?,?,?,?)')
            const results = newSong.run(req.body.title,req.body.artist,req.body.year,req.body.downloads,req.body.price,req.body.quantity)
            res.json({id: newSong.lastInsertRowId});
        }
    //error checking, if there is a internal server error then return the error message
    }catch(error){
        res.status(500).json({error: error.message})
    }
});


//A PUT route to change the quantity and price of an existing song.
app.put('/songs/update/:id', (req,res) => {
    try{
        const stmt = db.prepare('UPDATE wadsongs SET quantity=?,price=? WHERE id=?')
        //body(POST/PUT) is for the json and params(GET) is for the url
        const results = stmt.run(req.body.quantity, req.body.price, req.params.id);
        res.status(results.changes ? 200:404).json({success: results.changes ? true: false});
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

app.listen(PORT);
console.log(`Server running on port ${PORT}.`);