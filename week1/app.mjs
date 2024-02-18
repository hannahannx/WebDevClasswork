// importaning modules to use 
import express from 'express'
import Database from 'better-sqlite3'

// creating application varibles 
const app = express();
const db = new Database("wadsongs.db");

//use to read the JSON data from the request body
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//hello world route
app.get('/', (req,res)=>{
    res.send('Hello World ');
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




app.listen(3000);