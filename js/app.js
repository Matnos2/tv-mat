const playlists = {
    'https://raw.githubusercontent.com/Matnos2/listas/main/Matnos_list.m3u': {
        'Sublista 1': ['https://example.com/playlist1-sub1.m3u8', 'https://example.com/playlist1-sub2.m3u8'],
        'Sublista 2': ['https://example.com/playlist1-sub3.m3u8', 'https://example.com/playlist1-sub4.m3u8']
    },
    'playlist2.m3u8': {
        'Sublista 3': ['https://example.com/playlist2-sub1.m3u8', 'https://example.com/playlist2-sub2.m3u8'],
        'Sublista 4': ['https://example.com/playlist2-sub3.m3u8', 'https://example.com/playlist2-sub4.m3u8']
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
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const sublists = playlists[playlist][sublist];

    // Limpiar el contenido previo
    playlistContent.innerHTML = '';

    sublists.forEach((video, index) => {
        const listItem = document.createElement('div');
        listItem.textContent = `Video ${index + 1}: ${video}`;
        listItem.onclick = () => {
            videoSource.src = video;
            videoPlayer.load();
            videoPlayer.play();
        };
        playlistContent.appendChild(listItem);
    });
}

// Cargar la primera lista por defecto al iniciar la página
document.addEventListener('DOMContentLoaded', loadPlaylist);
