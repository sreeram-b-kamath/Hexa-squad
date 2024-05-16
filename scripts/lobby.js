document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('draw-button').addEventListener('click', () => {
        window.location.href = '../drawer.html'; // Redirect to draw page
    });

    document.getElementById('watch-button').addEventListener('click', () => {
        window.location.href = 'viewer-page.html'; // Redirect to watch page
    });
    document.getElementById('leaderboard-button').addEventListener('click', () => {

        window.location.href = 'leaderboard.html'; 
    });
    
});


