document.addEventListener("DOMContentLoaded", function () {
    const music = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");
    const content = document.getElementById("content");

    // Bouton play/pause musique
    musicToggle.addEventListener("click", () => {
        if (music.paused) {
            music.play().catch(() => {
                console.log("Impossible de lancer la musique automatiquement.");
            });
            musicToggle.innerText = "🔊 Mettre en pause";
        } else {
            music.pause();
            musicToggle.innerText = "🔈 Lecture";
        }
    });

    // Boutons pour afficher les différentes sections
    document.getElementById("histoire").addEventListener("click", () => {
        content.innerHTML = `
            <h2>Notre Histoire</h2>
            <p>
                Tout d'abord Cléia, je te remercie pour ces 4 et bientôt 5 années passées à tes côtés...
            </p>
        `;
    });

    document.getElementById("photos").addEventListener("click", () => {
        content.innerHTML = `
            <h2>Nos Photos</h2>
            <div class="gallery">
                <img src="photos/photo1.jpg" alt="Photo 1">
                <img src="photos/photo2.jpg" alt="Photo 2">
                <img src="photos/photo3.jpg" alt="Photo 3">
            </div>
        `;
    });

    document.getElementById("videos").addEventListener("click", () => {
        content.innerHTML = `
            <h2>Petite Surprise Vidéos</h2>
            <video controls>
                <source src="videos/surprise.mp4" type="video/mp4">
                Votre navigateur ne supporte pas la lecture vidéo.
            </video>
        `;
    });
});
