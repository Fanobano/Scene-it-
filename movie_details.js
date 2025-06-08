const movieData = {
batman: {
    title: "The Batman 2022",
    rating: "7.8 / 10 Rating by IMDB",
    pg: "PG 13+",
    release: "2022",
    director: "Matt Reeves",
    writers: "Matt Reeves, Peter Craig, Bob Kane",
    duration: "2h 56min",
    poster: "/Assets/batman.jpg",
    trailer: "https://www.youtube.com/watch?v=NLOp_6uPccQ",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, the Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    genres: ["Action", "Superhero", "Crime", "Drama", "Thriller", "Mystery"],
    reviews: [
      {
        author: "CinemaFanatic88",
        rating: "★★★★☆",
        text: "A dark and gritty take on the caped crusader. Robert Pattinson delivers a compelling performance. The cinematography is stunning, though the nearly 3-hour runtime feels a bit long."
      },
      {
        author: "MovieMaven23",
        rating: "★★★☆☆",
        text: "Visually impressive and a solid detective story at its core. However, it sometimes gets lost in its own moodiness. Good, but not groundbreaking."
      },
      {
        author: "CasualViewer007",
        rating: "★★★★★",
        text: "Loved it! The action scenes were awesome and Batman was super cool. Definitely recommend!"
      }
    ]
  },

pulp_fiction: {
    title: "Pulp Fiction",
    rating: "8.9 / 10 Rating by IMDB",
    pg: "R",
    release: "1994",
    director: "Quentin Tarantino",
    writers: "Quentin Tarantino, Roger Avary",
    duration: "2h 34min",
    poster: "/Assets/pulpfiction.jpg",
    trailer: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genres: ["Crime", "Drama"],
    reviews: [
        {
        author: "FilmBuff99",
        rating: "★★★★★",
        text: "A masterpiece of nonlinear storytelling. Tarantino's dialogue and style are unmatched."
        },
        {
        author: "RetroCinemaLover",
        rating: "★★★★☆",
        text: "Iconic and endlessly quotable. A must-watch, though its violence might not be for everyone."
        }
    ]
},

asteroid_city: {
    title: "Asteroid City",
    rating: "6.6 / 10 Rating by IMDB",
    pg: "PG-13",
    release: "2023",
    director: "Wes Anderson",
    writers: "Wes Anderson, Roman Coppola",
    duration: "1h 45min",
    poster: "/Assets/asteroidcity.jpg",
    trailer: "https://www.youtube.com/watch?v=9FXCSXuGTF4",
    description: "Following a writer on his world-famous fictional play about a grieving father who travels with his tech-obsessed family to a small rural asteroid city to compete in a junior stargazing event.",
    genres: ["Comedy", "Drama", "Sci-Fi"],
    reviews: [
        {
        author: "ArtHouseAlex",
        rating: "★★★★☆",
        text: "A visually stunning film with Wes Anderson’s signature style. Emotionally subtle but rewarding."
        },
        {
        author: "IndieMovieFan",
        rating: "★★★☆☆",
        text: "Charming and unique, but not for everyone. Feels a bit too quirky at times."
        }
    ]
},

bullet_train: {
    title: "Bullet Train",
    rating: "7.3 / 10 Rating by IMDB",
    pg: "R",
    release: "2022",
    director: "David Leitch",
    writers: "Zak Olkewicz, based on the novel by Kôtarô Isaka",
    duration: "2h 6min",
    poster: "/Assets/bullettrain.jpg",
    trailer: "https://www.youtube.com/watch?v=0IOsk2Vlc4o",
    description: "Five assassins aboard a fast-moving bullet train find out their missions have something in common.",
    genres: ["Action", "Comedy", "Thriller"],
    reviews: [
    {
        author: "ActionJunkie88",
        rating: "★★★★☆",
        text: "Fast-paced and fun. Brad Pitt delivers a hilarious performance with stylish action."
    },
    {
        author: "CasualViewer007",
        rating: "★★★☆☆",
        text: "Good for a fun ride. It’s chaotic, but not always in a good way."
    }
  ]
  },
};

function getMovieIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function watchTrailer(title) {
  const movie = Object.values(movieData).find(m => m.title === title);
  if (movie && movie.trailer) {
    window.open(movie.trailer, '_blank');
  } else {
    alert("Trailer not available.");
  }
}


function loadMovieDetails() {
  const id = getMovieIdFromURL();
  const movie = movieData[id];

  if (!movie) {
    document.getElementById("movieDetail").innerHTML = "<p>Movie not found.</p>";
    return;
  }

  document.title = `${movie.title} - Scene It?`;

  const genresHTML = movie.genres.map(g => `<button class="genre-tag">${g}</button>`).join("");
  const reviewsHTML = movie.reviews.map(r => `
    <div class="review-item">
      <p class="review-author"><strong>${r.author}</strong> - <span class="review-rating">${r.rating}</span></p>
      <p class="review-text">${r.text}</p>
    </div>
  `).join("");

  document.getElementById("movieDetail").innerHTML = `
    <div class="movie-details-header">
      <img src="${movie.poster}" alt="${movie.title} Poster" class="details-poster">
      <div class="details-info">
        <h2>${movie.title}</h2>
        <p class="rating">${movie.rating}</p>
        <p class="pg-rating">${movie.pg}</p>
        <p><strong>Release:</strong> ${movie.release}</p>
        <p><strong>Director:</strong> ${movie.director}</p>
        <p><strong>Writers:</strong> ${movie.writers}</p>
        <p><strong>Duration:</strong> ${movie.duration}</p>
        <button class="watch-trailer-btn details-trailer-btn" onclick="watchTrailer('${movie.title}')">Watch Trailer</button>
        <div class="genre-tags">${genresHTML}</div>
      </div>
    </div>

    <section class="description-section movie-details-block">
      <h3>Description</h3>
      <p>${movie.description}</p>
    </section>

    <section class="reviews-section movie-details-block">
      <h3>Reviews</h3>
      ${reviewsHTML}
    </section>
  `;
}

document.addEventListener("DOMContentLoaded", loadMovieDetails);
