var AIRTABLE_URL = "https://api.airtable.com/v0/appPCKY59FaMZWsi4/Table%201";
var AIRTABLE_URL2 = "https://api.airtable.com/v0/appPCKY59FaMZWsi4/Table%203"
var KEY_QUERY = "api_key=key8nUdblw0IguYvd";
var ARTIST_QUERY = "field%5D=Artist&field%5D=Album_Image";
var TRACK_QUERY = "field%5D=Artist&field%5D=Album_Image&field%5D=Album&field%5D=Duration&field%5D=Track";
var SINGLEARTIST_QUERY = "field%5D=Artist&field%5D=Artist_ID";

const key_list = {
  0: "C",
  1: "C♯/D♭",
  2: "D",
  3: "D♯/E♭",
  4: "E",
  5: "F",
  6: "F♯/G♭",
  7: "G",
  8: "G♯/A♭",
  9: "A",
  10: "A♯/B♭",
  11: "B"
}
function fetchArtists() {
  var heading = document.getElementById("heading");
  heading.innerHTML = "Artists"
  var artistResultElement = document.getElementById("main-content");
  
  artistResultElement.setAttribute("id", "artist-content");
  fetch(`${AIRTABLE_URL}?${KEY_QUERY}&${ARTIST_QUERY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data); // response is an object w/ .records array

      artistResultElement.innerHTML = ""; // clear HTML

      var newHtml = "";
      let array = [];
      for (var i = 0; i < data.records.length; i++) {
        var artistName = data.records[i].fields["Artist"];
        var artistImage = data.records[i].fields["Album_Image"];
        var artistID = data.records[i].fields["Artist_ID"];
        if (!array.includes(artistName)) {
          array.push(artistName);
          let array_image = artistImage.split(",");
          newHtml += `
            <div class="artist-individual">
              <a class="artist-image" href="index.html?artists?${data.records[i].id}?${artistID}">
                <img src = "${array_image[1]}" alt="Artist" style="border-radius: 50%;">
              </a>
              <a class = "" href="index.html?artists?${data.records[i].id}?${artistID}">
                ${artistName} 
              </a>
            </div>
        ` ;
        }
      }

      artistResultElement.innerHTML = newHtml;
    });
}
function fetchTracks() {
  var heading = document.getElementById("heading");
  heading.innerHTML = "Tracks"
  
  var trackResultElement = document.getElementById("main-content");
  fetch(`${AIRTABLE_URL}?${KEY_QUERY}&${TRACK_QUERY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data); // response is an object w/ .records array

      trackResultElement.innerHTML = "";

      var newHtml = "";
      for (var i = 0; i < data.records.length; i++) {
        var artistName = data.records[i].fields["Artist"];
        var artistImage = data.records[i].fields["Album_Image"];
        var albumName = data.records[i].fields["Album"];
        var duration = data.records[i].fields["Duration"];
        var trackName = data.records[i].fields["Track"];
        
        let array_image = artistImage.split(",");
        
        var intDuration = parseInt(duration);
        var minutes = Math.floor(intDuration/60000);
        var seconds = Math.round((intDuration - (minutes * 60000))/1000);
        if (seconds < 10) {
          seconds = '0' + seconds;
        } 
        newHtml += `
          <li>
            <a class="track-individual" href="index.html?tracks?${data.records[i].id}">
              <div>
                <div class="track-image">
                  <img src = "${array_image[1]}" alt="Artist">
                </div>
              </div>
              <div class="container track-description">
                <div class="row">
                  <span class="col-6 d-flex flex-column">
                    <div>
                      ${trackName}
                    </div>
                    <div>
                      ${artistName}
                    </div>
                  </span>
                  <span class="col-4 album-name">
                    ${albumName}
                  </span>
                  <span class="col duration">
                    ${minutes}:${seconds}
                  </span>
                </div>
              </div>
            </a>
          </li>
        `;
      }
      trackResultElement.innerHTML += `<ul id="track-content">` + newHtml + `</ul>`
    });
}

function fetchSingleTrack(Id) {
  var mainResultElement = document.getElementById("main-content");
  fetch(`${AIRTABLE_URL}/${Id}?${KEY_QUERY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data); // response is a single object
    
      mainResultElement.innerHTML = "";
    
      var newHtml = "";
      
      var artistName = data.fields["Artist"];
      var artistImage = data.fields["Album_Image"];
      var albumName = data.fields["Album"];
      var duration = data.fields["Duration"];
      var trackName = data.fields["Track"];
      var albumDate = data.fields["Album_Date"];
      var trackPop = data.fields["Track_Popularity"];
      var tempo = data.fields["Tempo"];
      var key = data.fields["Key"];
      var energy = parseFloat(data.fields["Energy"]) * 100;
      var accousticness = parseFloat(data.fields["Acousticness"]) * 100;
      var danceability = parseFloat(data.fields["Danceability"]) * 100;
      var liveness = parseFloat(data.fields["Liveness"]) * 100;
      var loudness = data.fields["Loudness"];
      var speechiness = parseFloat(data.fields["Speechiness"]) * 100;
      
      
      let array_image = artistImage.split(",");
      let dateSplit = albumDate.split("-");
      var intDuration = parseInt(duration);
      var minutes = Math.floor(intDuration/60000);
      var seconds = Math.round((intDuration - (minutes * 60000))/1000);
      if (seconds < 10) {
        seconds = '0' + seconds;
      } 
      if (energy % 1 == 0) {
        energy = energy.toFixed();
      } else {
        energy = energy.toFixed(2);
      }
      if (accousticness % 1 == 0) {
        accousticness = accousticness.toFixed();
      } else {
        accousticness = accousticness.toFixed(2);
      }
      if (danceability % 1 == 0) {
        danceability = danceability.toFixed();
      } else {
        danceability = danceability.toFixed(2);
      }
      if (liveness % 1 == 0) {
        liveness = liveness.toFixed();
      } else {
        liveness = liveness.toFixed(2);
      }
      if (speechiness % 1 == 0) {
        speechiness = speechiness.toFixed();
      } else {
        speechiness = speechiness.toFixed(2);
      }
      newHtml += `
        <div style = "background-image: url(${array_image[0]});" class = "bg-image"></div>
        <div class = "bg-text">
          <div class = "song-name">
            ${trackName}
          </div>
          <div class = "d-flex justify-content-center" style = "color: rgb(200,200,200);">
             ${artistName} · ${albumName} · ${dateSplit[0]} · ${minutes} minutes ${seconds} seconds
          </div>
          <div class = "d-flex justify-content-center">
            <div class = "fact-block">
              <div class = "fact-blox-text">
                ${tempo} BPM
              </div>
              <div class = "fact-box-label">
                Tempo
              </div>
            </div>
            <div class = "fact-block">
              <div class = "fact-blox-text">
                ${key_list[key]}
              </div>
              <div class = "fact-box-label">
                Key
              </div>
            </div>
          </div>
          <div class = "d-flex justify-content-center">
            <div class = "fact-block">
              <div class = "fact-blox-text">
                ${trackPop}%
              </div>
              <div class = "fact-box-label">
                Popularity
              </div>
            </div>
            <div class = "fact-block">
              <div class = "fact-blox-text">
                ${energy}%
              </div>
              <div class = "fact-box-label">
                Energy
              </div>
            </div>
          </div>
          <div class = "d-flex justify-content-center">
            <div class = "fact-block">
              <div class = "fact-blox-text">
                ${accousticness}%
              </div>
              <div class = "fact-box-label">
                Accousticness
              </div>
            </div>
            <div class = "fact-block">
              <div class = "fact-blox-text">
                ${danceability}%
              </div>
              <div class = "fact-box-label">
                Danceability
              </div>
            </div>
          </div>
          <div class = "d-flex justify-content-center">
            <div class = "fact-block">
              <div class = "fact-blox-text">
                ${liveness}%
              </div>
              <div class = "fact-box-label">
                Liveness
              </div>
            </div>
            <div class = "fact-block">
              <div class = "fact-blox-text">
                ${loudness} dB
              </div>
              <div class = "fact-box-label">
                Loudness
              </div>
            </div>
          </div>
          <div class = "d-flex justify-content-center">
            <div class="fact-block">
              <div class = "fact-blox-text">
                ${speechiness}%
              </div>
              <div class = "fact-box-label">
                Speechiness
              </div>
            </div>
          </div>
        </div>
      `;
      mainResultElement.innerHTML += newHtml;
    });
}

function fetchSingleArtist(Id, artist) {
  var mainResultElement = document.getElementById("main-content");
  fetch(`${AIRTABLE_URL}/${Id}?${KEY_QUERY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data); // response is a single object
    
      mainResultElement.innerHTML = "";
      
      var newHtml = "";
    
      var artistName = data.fields["Artist"];
      var artistImage = data.fields["Album_Image"];
    
      let array_image = artistImage.split(",");
      newHtml +=  `
          <div class="">
            <a class="artist-image">
              <img src = "${array_image[1]}" alt="Artist" style="border-radius: 50%;">
            </a>
            <a class = "artist-name" style = "font-size: 72px; font-weight: 800; padding-left: 25px; ">
              ${artistName} 
            </a>
          </div>
          <h3 id="heading" style = "padding: 50px 0 20px 0;">Top Tracks</h3>
      `;
      mainResultElement.innerHTML += newHtml;
  });
  fetch(`${AIRTABLE_URL2}?${KEY_QUERY}`)
    .then(response => response.json())
    .then(data => {  
      console.log(data); // response is an object w/ .records array
      var newHtml = '<div id= "artist-content">';
      for (var i = 0; i < data.records.length; i++) {
        var artistName = data.records[i].fields["Artist"];
        var artistID = data.records[i].fields["Artist_ID"];
        var trackImage = data.records[i].fields["Track_Image"];
        var topTrack = data.records[i].fields["Top_Tracks"];
        var sound = data.records[i].fields["URL"];
        
        var combineTopTrack = topTrack.replace(/ /g, "");
        
        if (artistID == artist) {
          newHtml += `
            <audio id="${artistID}-${combineTopTrack}-sound" src="${sound}" preload="auto">
	            Your browser does not support the <code>audio</code> element.
            </audio>
            <div class="artist-individual">
              <a class="artist-image" id="${artistID}-${combineTopTrack}" onmouseover="play_sound(id)" onmouseleave="stop_sound(id)">
                <img src = "${trackImage}" alt="Artist">
              </a>
              <a class = "">
                ${topTrack} 
              </a>
            </div>
          `
        }
      }
      function offset_query(offset) {
        fetch(`${AIRTABLE_URL2}?${KEY_QUERY}&offset=${offset}`)
          .then(response => response.json())
          .then(data => {  
            console.log(data); // response is an object w/ .records array
            for (var i = 0; i < data.records.length; i++) {
              var artistName = data.records[i].fields["Artist"];
              var artistID = data.records[i].fields["Artist_ID"];
              var trackImage = data.records[i].fields["Track_Image"];
              var topTrack = data.records[i].fields["Top_Tracks"];
              var sound = data.records[i].fields["URL"];
              var combineTopTrack = topTrack.replace(/ /g, "");
              if (artistID == artist) {
                newHtml += `
                  <audio id="${artistID}-${combineTopTrack}-sound" src="${sound}" preload="auto">
	                  Your browser does not support the <code>audio</code> element.
                  </audio>
                  <div class="artist-individual">
                    <a class="artist-image" id="${artistID}-${combineTopTrack}" onmouseover="play_sound(id)" onmouseleave="stop_sound(id)">
                      <img src = "${trackImage}" alt="Artist">
                    </a>
                    <a class = "">
                      ${topTrack} 
                    </a>
                  </div>
                `
              }
            }
            if (data.offset !== undefined) {
              offset_query(data.offset, artist);
              return;
            }
            newHtml += `</div>`;
            mainResultElement.innerHTML += newHtml;
        });
      }
      if (data.offset !== undefined) {
        offset_query(data.offset);
      } else {
        newHtml += `</div>`;
        mainResultElement.innerHTML += newHtml;
      }
      console.log(mainResultElement.innerHTML);
  });
}

function play_sound(Id) {
  var sound = document.getElementById(Id+"-sound");
  console.log(Id);
  sound.play();
}

function stop_sound(Id) {
  var sound = document.getElementById(Id+"-sound");
  sound.pause();
  sound.currentTime = 0;
}
var idParams = window.location.search.split("?");
if (idParams.length >= 3) {
  // has at least ["id?", "OUR ID"]
  // create detail view HTML w/ our id
  if (idParams[1] == 'tracks') {
    fetchSingleTrack(idParams[2]);
  } else {
    fetchSingleArtist(idParams[2], idParams[3]);
  }
} else {
  if (idParams[1] == 'tracks') {
    fetchTracks();
  } else {
    fetchArtists();
  }
}