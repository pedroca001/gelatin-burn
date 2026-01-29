document.addEventListener('DOMContentLoaded', function () {

    // --- Viewer Counter Logic ---
    const viewerCountElement = document.getElementById('viewer-count-display');

    function updateViewerCount() {
        if (!viewerCountElement) return;

        // Get min/max from data attributes if available, else default
        // Get min/max from data attributes if available, else default
        let min = parseInt(viewerCountElement.getAttribute('data-min')) || 400;
        let max = parseInt(viewerCountElement.getAttribute('data-max')) || 800; // Updated to 800

        const randomCount = Math.floor(Math.random() * (max - min + 1)) + min;
        viewerCountElement.textContent = randomCount;
    }

    // Update immediately and then every 7 seconds
    updateViewerCount();
    setInterval(updateViewerCount, 7000);


    // --- UTM & Password Persistence Engine (Robust) ---
    // Monitora a página para injetar parâmetros em botões dinâmicos (VSL Pitch)
    function applyParamsToButtons() {
        const currentParams = new URLSearchParams(window.location.search);
        if (currentParams.toString() === "") return;

        // Procura por todos os links válidos
        // Excluindo âncoras puras (#) e javascript:
        const links = document.querySelectorAll('a:not([href^="#"]):not([href^="javascript:"])');

        links.forEach(link => {
            try {
                // Pega o href absoluto
                const href = link.href;
                if (!href) return;

                let buttonUrl = new URL(href);

                // Itera sobre as UTMs e a senha da URL atual e as repassa para o botão
                currentParams.forEach((value, key) => {
                    buttonUrl.searchParams.set(key, value);
                });

                // Atualiza o link do botão com os parâmetros preservados
                link.href = buttonUrl.toString();
            } catch (e) {
                // Ignora erros de parse de URL
                // console.warn("Erro ao processar link dinâmico.");
            }
        });
    }

    // --- LOGICA DE MONITORAMENTO (Para botões que aparecem no pitch) ---
    // 1. Tenta aplicar imediatamente
    applyParamsToButtons();

    // 2. Observa a página para detectar quando o botão do pitch é injetado
    const observer = new MutationObserver((mutations) => {
        applyParamsToButtons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 3. Backup: Executa a cada 2 segundos para garantir que nenhum botão escape
    setInterval(applyParamsToButtons, 2000);


    // --- Content Protection ---

    // Disable Right Click
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // Disable Copy
    document.addEventListener('copy', function (e) {
        e.preventDefault();
        return false;
    });

    // Disable Cut
    document.addEventListener('cut', function (e) {
        e.preventDefault();
        return false;
    });

    // Disable Drag (prevent dragging images etc)
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
    });

    // Disable Key Shortcuts (Ctrl+C, Ctrl+U, etc - strict mode)
    document.addEventListener('keydown', function (e) {
        // Ctrl+C, Ctrl+X, Ctrl+U (view source), F12 (dev tools - hard to block reliably but we can try)
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X' || e.key === 'u' || e.key === 'U')) {
            e.preventDefault();
            return false;
        }
    });

});
