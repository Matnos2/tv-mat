document.addEventListener("DOMContentLoaded", function () {
    fetch('channels.m3u')
        .then(response => response.text())
        .then(data => {
            const channels = parseM3U(data);
            displayChannels(channels);
        })
        .catch(error => console.error('Error al cargar el archivo M3U:', error));

    function parseM3U(data) {
        const lines = data.split('\n');
        const channels = [];
        let channelName = "";

        for (let line of lines) {
            line = line.trim();
            if (line.startsWith('#EXTINF:')) {
                channelName = line.split(',')[1].trim();
            } else if (line && !line.startsWith('#')) {
                channels.push({ name: channelName, url: line.trim() });
            }
        }

        return channels;
    }

    function displayChannels(channels) {
        const channelsList = document.getElementById('channels');
        channelsList.innerHTML = '';

        channels.forEach(channel => {
            const li = document.createElement('li');
            li.textContent = channel.name;
            li.addEventListener('click', () => playChannel(channel.url));
            channelsList.appendChild(li);
        });
    }

    function playChannel(url) {
        const videoPlayer = document.getElementById('videoPlayer');

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(videoPlayer);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
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
