// Cargar el archivo m3u de películas y mostrar las imágenes
fetch('listas/peliculas.m3u')
    .then(response => response.text())
    .then(data => {
        const movies = parseM3U(data);
        const movieList = document.getElementById('movie-list');

        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            const movieImage = document.createElement('img');
            movieImage.src = movie.logo; // Asume que en el m3u hay una sección de logo
            movieImage.alt = movie.name;
            movieItem.appendChild(movieImage);

            movieItem.onclick = () => {
                const player = document.createElement('video');
                player.src = movie.url;
                player.controls = true;
                player.autoplay = true;
                movieItem.appendChild(player);
            };

            movieList.appendChild(movieItem);
        });
    });

