//add song ajax function
async function ajaxAdd(newSong){
    try{
        //sending the request to the localhost URL 
        const response = await fetch('http://localhost:3300/songs/addnewsong/', {
        //read in the parameters artist title etc n add to database    
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(newSong)
        });
    }catch (e) {
        alert(`Error ${e}`);
    }
}

//AJAX running to add to database when sumbit button pressed
document.getElementById('addNewSong').addEventListener('click', ()=> {
    const title = document.getElementById('songTitle').value;
    const artist = document.getElementById('artistName').value;
    const year = document.getElementById('songYear').value;
    const downloads = document.getElementById('songDownloads').value;
    const price = document.getElementById('songPrice').value;
    const quantity = document.getElementById('songQuantity').value;

    const newSong = {
        "title": title,
        "artist": artist,
        "year": year,
        "downloads": downloads,
        "price": price,
        "quantity": quantity
    }

    ajaxAdd(newSong)
})