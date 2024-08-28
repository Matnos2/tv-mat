document.addEventListener("DOMContentLoaded", function () {
    // Cargar el archivo m3u de la lista de canales
    fetch('listas/tv.m3u') // Asegúrate de que el archivo esté en la ruta correcta
        .then(response => response.text())
        .then(data => {
            const channels = parseM3U(data);
            displayChannels(channels);
        })
        .catch(error => console.error('Error al cargar el archivo M3U:', error));

    // Función para parsear el archivo m3u y extraer canales
    function parseM3U(data) {
        const lines = data.split('\n');
        const channels = [];
        let channelName = "";
        let channelLogo = "";

        for (let line of lines) {
            line = line.trim();

            if (line.startsWith('#EXTINF:')) {
                const parts = line.split(','); // Dividir la línea en partes
                channelName = parts[1] ? parts[1].trim() : 'Canal sin nombre'; // Extraer nombre del canal
                const logoMatch = line.match(/tvg-logo="(.+?)"/); // Buscar logo en la línea
                channelLogo = logoMatch ? logoMatch[1] : 'img/default-logo.png'; // Usar logo por defecto si no existe
            } else if (line && !line.startsWith('#')) {
                // Si la línea es una URL, agregar canal a la lista
                channels.push({ name: channelName, url: line.trim(), logo: channelLogo });
            }
        }

        return channels;
    }

    // Función para mostrar la lista de canales
    function displayChannels(channels) {
        const channelsList = document.getElementById('channel-list'); // Asumiendo un div con id 'channel-list'
        channelsList.innerHTML = ''; // Limpiar la lista de canales previa

        channels.forEach(channel => {
            const channelItem = document.createElement('div'); // Crear un contenedor para cada canal
            channelItem.className = 'channel-item'; // Añadir clase para estilos CSS

            const logoImg = document.createElement('img'); // Imagen del logo del canal
            logoImg.src = channel.logo;
            logoImg.alt = channel.name;
            logoImg.className = 'channel-logo'; // Añadir clase para estilos

            const channelName = document.createElement('span'); // Nombre del canal
            channelName.textContent = channel.name;
            channelName.className = 'channel-name'; // Añadir clase para estilos

            // Añadir logo y nombre al contenedor del canal
            channelItem.appendChild(logoImg);
            channelItem.appendChild(channelName);

            // Añadir evento de clic para reproducir el canal
            channelItem.addEventListener('click', () => playChannel(channel.url));

            // Añadir el canal a la lista de canales
            channelsList.appendChild(channelItem);
        });
    }

    // Función para reproducir el canal seleccionado
    function playChannel(url) {
        const videoPlayer = document.getElementById('videoPlayer'); // Asumiendo un elemento video con id 'videoPlayer'

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(videoPlayer);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                videoPlayer.play();
            });
        } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
            // Para dispositivos con soporte HLS nativo (iOS, Safari)
            videoPlayer.src = url;
            videoPlayer.play();
        } else {
            alert("Tu navegador no soporta HLS.");
        }
    }
});
