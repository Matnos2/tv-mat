// Cargar el archivo m3u de series y mostrar los elementos
fetch('listas/series.m3u')
    .then(response => response.text())
    .then(data => {
        const series = parseM3U(data);
        const seriesList = document.getElementById('series-list');

        series.forEach(serie => {
            const seriesItem = document.createElement('div');
            seriesItem.className = 'series-item';
            const seriesImage = document.createElement('img');
            seriesImage.src = serie.logo; // Asume que en el m3u hay una sección de logo
            seriesImage.alt = serie.name;
            seriesItem.appendChild(seriesImage);

            seriesItem.onclick = () => {
                const player = document.createElement('video');
                player.src = serie.url;
                player.controls = true;
                player.autoplay = true;
                seriesItem.appendChild(player);
            };

            seriesList.appendChild(seriesItem);
        });
    });

