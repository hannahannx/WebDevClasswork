//index.js - client side running in the browser


//function to link to the search api route from the mjs file 
// function ajaxSearch(artistName){
//     fetch(`http://localhost:3400/songs/artist/${artistName}`)
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
        const response = await fetch(`http://localhost:3400/songs/artist/${artistName}`);
        //parsing the JSON
        const allSongs = await response.json();
        // display JSON
        console.log("JSON returned:");
        console.log(JSON.stringify(allSongs));
    


        // Prevents adding the new artist song infomation at the end of the current results
        const resultsDiv = document.getElementById("artistSearchResults");

        resultsDiv.innerHTML = "";

        //loop through the array which is returend by the json file    
        allSongs.forEach(song => {
            //For each song which is displayed. 
            //Create a paragraph and buttons 
            const para = document.createElement("p");
            const buySongButton = document.createElement("input");
            buySongButton.setAttribute("type","button");
            buySongButton.setAttribute("value","Buy")
            
            //Set the innerHTML of the paragrapgh to the song details
            para.innerHTML = 
            `Title: ${song.title} <br>
            Artist: ${song.artist} <br>
            Year: ${song.year} <br>
            Downloads: ${song.downloads} <br>
            Price: ${song.price} <br>
            Quantity:${song.quantity} <br>`

            
            //Add the paragrapgh to the <div>(question 2)
            document.getElementById('artistSearchResults').appendChild(para)
           
            //Create a 'buy button' with an event handler - NEED TO COMPLETE
            buySongButton.addEventListener('click', async() =>{
                const response2 = await fetch(`http://localhost:3400/songs/buy/${song.id}`, {
                    method: 'POST',
                });
            })


        //place the button here
         para.appendChild(buySongButton);

         resultsDiv.appendChild(para)
            //non DOM way of displaying the JSON results
             /*
             html +=
            `Title: ${song.title} <br>
            Artist: ${song.artist} <br>
            Year: ${song.year} <br>
            Downloads: ${song.downloads} <br>
            Price: ${song.price} <br>
            Quantity:${song.quantity} <br>
            <br/>`; */
            
        });
        
        //non DOM of replacing the content into the results section
        //document.getElementById('artistSearchResults').innerHTML = html;
    }catch (e) {
        alert(`Error: ${e}`);
    }
 //place the button here

};


//AJAX running when we click a button
document.getElementById('searchArtistButton').addEventListener('click', ()=> {
    //read the artist name from the input field
    const artist = document.getElementById('artistName').value;
    //testing retreiving correct artist
    console.log(`Artist is ${artist}`);
    ajaxSearch(artist)
});
