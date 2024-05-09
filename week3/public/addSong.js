//add song ajax function

/*Add a new HTML page containing a form to allow the user to add a new song.
 When the user clicks the button on the form, 
 an AJAX POST request should be sent to your "add song" route from Week 2.*/

async function ajaxAdd(newSong){
    try{
        //sending the request to the localhost URL 
        const response = await fetch('http://localhost:3300/songs/addSong.html', {
             //read in the parameters artist title etc n add to database    
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(newSong)//converting the JSON string fromt his route into a JSON string
        });
        //checking the type of error message for the server an returning the correct code
        if (response.status == 400){
            alert(`One or more of your fields are blank`)
        }else if (response.status == 200){
            alert(`Added new song to database`)
        }else {
            alert(`Unknown error: code ${response.status}`);
        }
    }catch(error) {
        alert(`Error ${error}`);
    }
};

//AJAX running to add to database when sumbit button pressed
document.getElementById('addNewSong').addEventListener('click', async()=> {
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
    };
    try{
        ajaxAdd(newSong)
    }catch(e){
        alert(`Error ${e}`);
    }
    
});

//