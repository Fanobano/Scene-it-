function watchTrailer(title) {
    const trailers = {
        "The Batman": "https://www.youtube.com/watch?v=NLOp_6uPccQ",
        "Pulp Fiction": "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
        "Asteroid City": "https://www.youtube.com/watch?v=9FXCSXuGTF4",
        "Bullet Train": "https://www.youtube.com/watch?v=0IOsk2Vlc4o"
    };

    const url = trailers[title];
    if (url) {
        window.open(url, '_blank'); 
    } else {
        alert("Trailer not available.");
    }
}
