document.addEventListener("DOMContentLoaded", function () {
    fetch('channels.m3u')
        .then(response => response.text())
        .then(data => {
            const channels = parseM3U(data);
            if (channels.length > 0) {
                displayChannels(channels);
            } else {
                alert("No se encontraron canales en el archivo.");
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo:', error);
        });

    function parseM3U(data) {
        const lines = data.split('\n');
        const channels = [];
        let channelName = "";

        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('#EXTINF:')) {
                channelName = line.split(',')[1].trim();
            } else if (line && !line.startsWith('#')) {
                channels.push({ name: channelName, url: line.trim() });
            }
        });

        return channels;
    }

    function displayChannels(channels) {
        const channelsList = document.getElementById('channels');
        channels.forEach(channel => {
            const li = document.createElement('li');
            li.textContent = channel.name;
            li.addEventListener('click', () => {
                playChannel(channel.url);
            });
            channelsList.appendChild(li);
        });
    }

    function playChannel(url) {
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = url;
        videoPlayer.play();
    }
});

