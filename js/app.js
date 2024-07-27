const playlists = {
    'playlist1.m3u': {
        'Sublista 1': ['song1.mp3', 'song2.mp3'],
        'Sublista 2': ['song3.mp3', 'song4.mp3']
    },
    'playlist2.m3u': {
        'Sublista 3': ['song5.mp3', 'song6.mp3'],
        'Sublista 4': ['song7.mp3', 'song8.mp3']
    }
    // Agregar más listas y sublistas según sea necesario
};

function loadPlaylist() {
    const playlistSelect = document.getElementById('playlistSelect');
    const selectedPlaylist = playlistSelect.value;
    const sublistContainer = document.getElementById('sublistContainer');

    // Limpiar el contenido previo
    sublistContainer.innerHTML = '';

    if (playlists[selectedPlaylist]) {
        const sublists = playlists[selectedPlaylist];

        for (const sublistName in sublists) {
            const button = document.createElement('button');
            button.textContent = sublistName;
            button.onclick = () => loadSublist(selectedPlaylist, sublistName);
            sublistContainer.appendChild(button);
        }
    }
}

function loadSublist(playlist, sublist) {
    const playlistContent = document.getElementById('playlistContent');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    const sublists = playlists[playlist][sublist];

    // Limpiar el contenido previo
    playlistContent.innerHTML = '';

    sublists.forEach((song, index) => {
        const listItem = document.createElement('div');
        listItem.textContent = `Canción ${index + 1}: ${song}`;
        listItem.onclick = () => {
            audioSource.src = song;
            audioPlayer.load();
            audioPlayer.play();
        };
        playlistContent.appendChild(listItem);
    });
}

// Cargar la primera lista por defecto al iniciar la página
document.addEventListener('DOMContentLoaded', loadPlaylist);
