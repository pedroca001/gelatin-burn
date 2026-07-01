document.addEventListener('DOMContentLoaded', function () {

    // --- Affichage dynamique de la date ---
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('fr-FR', options);
        dateElement.textContent = formattedDate;
    }

    // --- Logique du compteur de spectateurs ---
    const viewerCountElement = document.getElementById('viewer-count-display');

    function updateViewerCount() {
        if (!viewerCountElement) return;

        // Récupérer min/max des attributs data si disponibles, sinon valeur par défaut
        let min = parseInt(viewerCountElement.getAttribute('data-min')) || 400;
        let max = parseInt(viewerCountElement.getAttribute('data-max')) || 800;

        const randomCount = Math.floor(Math.random() * (max - min + 1)) + min;
        viewerCountElement.textContent = randomCount;
    }

    // Mettre à jour immédiatement puis toutes les 7 secondes
    updateViewerCount();
    setInterval(updateViewerCount, 7000);


    // --- Moteur de persistance UTM & Mot de passe (Robuste) ---
    // Surveille la page pour injecter des paramètres dans les boutons dynamiques (Pitch VSL)
    function applyParamsToButtons() {
        const currentParams = new URLSearchParams(window.location.search);
        if (currentParams.toString() === "") return;

        // Recherche tous les liens valides
        // Excluant les ancres simples (#) et javascript:
        const links = document.querySelectorAll('a:not([href^="#"]):not([href^="javascript:"])');

        links.forEach(link => {
            try {
                // Récupère le href absolu
                const href = link.href;
                if (!href) return;

                let buttonUrl = new URL(href);

                // Itère sur les UTMs et le mot de passe de l'URL actuelle et les transmet au bouton
                currentParams.forEach((value, key) => {
                    buttonUrl.searchParams.set(key, value);
                });

                // Met à jour le lien du bouton avec les paramètres conservés
                link.href = buttonUrl.toString();
            } catch (e) {
                // Ignore les erreurs d'analyse d'URL
                // console.warn("Erreur lors du traitement du lien dynamique.");
            }
        });
    }

    // --- LOGIQUE DE SURVEILLANCE (Pour les boutons qui apparaissent dans le pitch) ---
    // 1. Tente d'appliquer immédiatement
    applyParamsToButtons();

    // 2. Observe la page pour détecter l'injection du bouton du pitch
    const observer = new MutationObserver((mutations) => {
        applyParamsToButtons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 3. Secours : S'exécute toutes les 2 secondes pour garantir qu'aucun bouton ne s'échappe
    setInterval(applyParamsToButtons, 2000);


    // --- Protection du contenu ---

    // Désactiver le clic droit
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // Désactiver la copie
    document.addEventListener('copy', function (e) {
        e.preventDefault();
        return false;
    });

    // Désactiver la coupe
    document.addEventListener('cut', function (e) {
        e.preventDefault();
        return false;
    });

    // Désactiver le glisser-déposer (empêcher de glisser les images, etc.)
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
    });

    // Désactiver les raccourcis clavier (Ctrl+C, Ctrl+U, etc - mode strict)
    document.addEventListener('keydown', function (e) {
        // Ctrl+C, Ctrl+X, Ctrl+U (voir la source), F12 (outils de dev - difficile à bloquer mais on essaie)
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X' || e.key === 'u' || e.key === 'U')) {
            e.preventDefault();
            return false;
        }
    });

});
