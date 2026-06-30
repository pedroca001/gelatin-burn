document.addEventListener('DOMContentLoaded', function () {

    // --- Affichage dynamique de la date ---
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString('fr-FR', options);
        dateElement.textContent = formattedDate;
    }

    // --- Moteur de persistance UTM ---
    // Surveille la page pour injecter des paramètres dans les boutons dynamiques
    function applyParamsToButtons() {
        const currentParams = new URLSearchParams(window.location.search);
        if (currentParams.toString() === "") return;

        // Recherche tous les liens valides (excluant les ancres et javascript:)
        const links = document.querySelectorAll('a:not([href^="#"]):not([href^="javascript:"])');

        links.forEach(link => {
            try {
                const href = link.href;
                if (!href) return;

                let buttonUrl = new URL(href);

                // Transmet tous les paramètres de l'URL actuelle au lien
                currentParams.forEach((value, key) => {
                    buttonUrl.searchParams.set(key, value);
                });

                // Met à jour le lien avec les paramètres conservés
                link.href = buttonUrl.toString();
            } catch (e) {
                // Ignore les erreurs d'analyse d'URL
            }
        });
    }

    // Appliquer immédiatement
    applyParamsToButtons();

    // Surveiller les liens ajoutés dynamiquement
    const observer = new MutationObserver((mutations) => {
        applyParamsToButtons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Secours : S'exécute toutes les 2 secondes pour garantir qu'aucun lien ne s'échappe
    setInterval(applyParamsToButtons, 2000);

});
