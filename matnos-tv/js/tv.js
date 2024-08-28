// Cargar el archivo m3u y mostrar los canales
fetch('listas/tv.m3u')
    .then(response => response.text())
    .then(data => {
        const channels = parseM3U(data);
        const channelList = document.getElementById('channel-list');
        const player = document.getElementById('tv-player');

        // Limpiar cualquier contenido previo
        channelList.innerHTML = '';

        channels.forEach(channel => {
            const channelItem = document.createElement('div');
            channelItem.className = 'channel-item';

            const channelLogo = document.createElement('img');
            channelLogo.src = channel.logo; // Usar logo del canal
            channelLogo.alt = channel.name;

            const channelName = document.createElement('span');
            channelName.textContent = channel.name;

            channelItem.appendChild(channelLogo);
            channelItem.appendChild(channelName);

            // Reproducir el canal seleccionado
            channelItem.onclick = () => {
                player.src = channel.url;
                player.play();
            };

            channelList.appendChild(channelItem);
        });
    })
    .catch(error => console.error('Error al cargar la lista de canales:', error));

// Función para parsear archivos m3u
function parseM3U(data) {
    const lines = data.split('\n');
    const channels = [];
    let channelInfo = null;

    lines.forEach(line => {
        line = line.trim(); // Eliminar espacios en blanco
        if (line.startsWith('#EXTINF')) {
            const nameMatch = line.match(/,(.+)/); // Extraer nombre del canal
            const name = nameMatch ? nameMatch[1] : 'Sin Nombre';
            const logoMatch = line.match(/tvg-logo="(.+?)"/); // Extraer tvg-logo
            const logo = logoMatch ? logoMatch[1] : '';

            channelInfo = { name, logo };
        } else if (line && line.startsWith('http')) {
            if (channelInfo) {
                channelInfo.url = line; // URL del stream
                channels.push(channelInfo);
                channelInfo = null; // Reiniciar para el próximo canal
            }
            
    }
    });

    return channels;
}

