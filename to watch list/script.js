const apiKey = 'c7eafaca84d8d06873db382f439e8b8c';

function searchMovies() {
    const searchInput = document.getElementById('searchInput').value;
    const MoviesGrid = document.getElementById('MoviesGrid');

    if (searchInput.trim() !== '') {
        MoviesGrid.innerHTML = '<p>Loading movies...</p>';

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    displayMovies(data.results);
                } else {
                    MoviesGrid.innerHTML = '<p>No movies found!</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                MoviesGrid.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
            });
    } else {
        alert('Please enter a movie title to search!');
    }
}

function displayMovies(movies) {
    const MoviesGrid = document.getElementById('MoviesGrid');
    MoviesGrid.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const movieImage = document.createElement('img');
        movieImage.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'; // Fallback image
        movieImage.alt = movie.title;

        const movieTitle = document.createElement('div');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = movie.title;

       
        movieImage.addEventListener('click', () => {
            addToWatchList(movie);
        });

        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieTitle);
        MoviesGrid.appendChild(movieCard);
    });
}

const watchList = [];
function addToWatchList(movie) {
    watchList.push(movie);
    displayWatchList();
}

function displayWatchList() {
    const watchListContainer = document.getElementById('watchList');
    watchListContainer.innerHTML = '';

    if (watchList.length === 0) {
        watchListContainer.innerHTML = '<p>Your watch list is empty.</p>';
        return;
    }

    watchList.forEach((movie, index) => {
        const watchListItem = document.createElement('div');
        watchListItem.classList.add('watch-list-item');

        const watchListImage = document.createElement('img');
        watchListImage.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/100x150?text=No+Image'; // Fallback image
        watchListImage.alt = movie.title;

        const watchListTitle = document.createElement('div');
        watchListTitle.classList.add('watch-list-title');
        watchListTitle.textContent = movie.title;

     
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            removeFromWatchList(index); 
        });

        watchListItem.appendChild(watchListImage);
        watchListItem.appendChild(watchListTitle);
        watchListItem.appendChild(deleteButton);
        watchListContainer.appendChild(watchListItem);
    });
}

function removeFromWatchList(index) {
    watchList.splice(index, 1); 
    displayWatchList(); 
}

document.getElementById('searchButton').addEventListener('click', search)
