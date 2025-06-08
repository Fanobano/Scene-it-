document.addEventListener('DOMContentLoaded', () => {
    const gamemodeItems = document.querySelectorAll('.gamemode-item');

    gamemodeItems.forEach(item => {
        item.addEventListener('click', () => {
            const gamemode = item.getAttribute('data-gamemode');
            let url = '';

            switch (gamemode) {
                case 'Guess The Scene':
                    url = '4Scene.html';
                    break;
                case 'Guess The Audio':
                    url = '4Audio.html';
                    break;
                case 'Guess The Quote':
                    url = '4Quote.html';
                    break;
                case 'Guess The Poster':
                    url = '4Poster.html';
                    break;
                default:
                    return;
            }

            window.location.href = url;
        });
    });
});
