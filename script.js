const bones = {
    id: "1",
    songName: "Bones",
    artist: "imagine Dragons",
    album: "It's Time",
    coverfile: "bones.webp",
};
const mirrors = {
    id: "2",
    songName: "Mirrors",
    artist: "imagine Dragons",
    album: "Smoke + Mirrors",
    coverfile: "mirrors.webp",
};
const natural = {
    id: "3",
    songName: "Natural",
    artist: "imagine Dragons",
    album: "Origins",
    coverfile: "natural.jpg",
};
const mercury = {
    id: "4",
    songName: "Mercury",
    artist: "imagine Dragons",
    album: "Mercury",
    coverfile: "mercury.jpg",
};
const bedLiar = {
    id: "5",
    songName: "Bed Liar",
    artist: "imagine Dragons",
    album: "Night Visions",
    coverfile: "bedLiar.jpg",
};

const musicLibrary = [
    bedLiar,
    bones,
    mercury,
    mirrors,
    natural,
];

let songs = [...musicLibrary];
let playlist = JSON.parse(localStorage.getItem('playlist')) ??[]; 

const pageBody = document.getElementById("page-body");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search-button");
const playlistElement = document.getElementById("playlist")

function loadLibrary() {
    pageBody.innerHTML = "";
    for(let index = 0; index < songs.length; index++) {
        pageBody.innerHTML += `
        <div class="card d-flex flex-column aling-items-center"
         style="width: 18rem; height: 30rem;">
            <img src="./images/covers/${songs[index].coverfile}" class="card-img-top" alt="Capa do disco">
                <div class="card-body d-flex flex-column align-items-center">
                <h5 class="card-title">${songs[index].songName}</h5>
                <p class="card-text">${songs[index].album}</p>
                <p class="card-text">${songs[index].artist}</p>
                <button class="btn btn-outline-success" onclick="addToPlaylist('${songs[index].id}')" ><i class="bi bi-plus-circle"></i></button>
            </div>
        </div>
        `;
    }
}

function loadPlaylist() {
    playlistElement.innerHTML = '';
    for (let index = 0; index < playlist.length; index ++) {
    playlistElement.innerHTML += `        
    <p id=${playlist[index].id} class="d-flex justify-content-between 
    border-top border-bottom align-items-center">
    ${playlist[index].songName} ${playlist[index].artist}
    <button class="btn btn-outline-danger" onclick = "removeFromPlaylist('${playlist[index].id}')">
    <i class="bi bi-trash-fill">
    </i></button></p>
    `
    }
}

function searchClick(){
    if (searchTerm.value === '') return;
    songs = songs.filter(song => song.songName.includes(searchTerm.value) ||
    song.album.includes(searchTerm.value) || song.artist.includes(searchTerm.value));
    loadLibrary();
}

function resetFilter() {
    if (searchTerm.value !== '') return;
    songs = [...musicLibrary];
    loadLibrary();
}

function removeFromPlaylist(songId) {
    playlist = playlist.filter((song) => song.id !== songId);
    document.getElementById(songId).remove()
    updateLocalStorage();
}

function addToPlaylist(songId) {
    if (playlist.find((song) => song.id === songId)) return;
    const songToAdd = songs.find((x) => x.id ===  songId );
    playlist.push(songToAdd);
    playlistElement.innerHTML += `        
    <p id=${songToAdd.id} class="d-flex justify-content-between 
    border-top border-bottom align-items-center">
    ${songToAdd.songName} ${songToAdd.artist}
    <button class="btn btn-outline-danger" onclick = "removeFromPlaylist('${songToAdd.id}')">
    <i class="bi bi-trash-fill">
    </i></button></p>`;
    updateLocalStorage();
    
}

function updateLocalStorage() {
    localStorage.setItem('playlist', JSON.stringify(playlist));
}

searchBtn.addEventListener("click", searchClick);
searchTerm.addEventListener("input", resetFilter);

loadLibrary();
loadPlaylist();
