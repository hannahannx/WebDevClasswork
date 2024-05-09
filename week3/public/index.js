//index.js - client side running in the browser


//function to link to the search api route from the mjs file 
// function ajaxSearch(artistName){
//     fetch(`http://localhost:3300/songs/artist/${artistName}`)
//     .then(response => response.text())
//     .then(text => {
//         document.getElementById('artistSearchResults').innerHTML = text;
//     })
//     .catch(e => { alert(`Error: ${e}`); });
// }

// ASYNC function to link to the search api route from the mjs file 
async function ajaxSearch(artistName) {
    try{
        console.log(`ajaxSearch called with artist ${artistName}`);
        //sending the request to the localhost URL 
        const response = await fetch(`http://localhost:3300/songs/artist/${artistName}`);
        //parsing the JSON
        const allSongs = await response.json();

        // display JSON
        console.log("JSON returned:");
        console.log(JSON.stringify(allSongs));
        //loop through thr array which is returend by the json file
        let html= "";
        allSongs.forEach(song => {
            html += 
            `Title: ${song.title} <br>
            Artist: ${song.artist} <br>
            Year: ${song.year} <br>
            Downloads: ${song.downloads} <br>
            Price: ${song.price} <br>
            Quantity:${song.quantity} <br>
            <br/>`;
        });
        document.getElementById('artistSearchResults').innerHTML = html;
    }catch (e) {
        alert(`Error: ${e}`);
    }
};


//AJAX running when we click a button
document.getElementById('searchArtistButton').addEventListener('click', ()=> {
    //read the artist name from the input field
    const artist = document.getElementById('artistName').value;
    //testing retreiving correct artist
    console.log(`Artist is ${artist}`);
    ajaxSearch(artist)
});


