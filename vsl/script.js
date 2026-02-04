document.addEventListener('DOMContentLoaded', function () {

    // --- Dynamic Date Display ---
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', options);
        dateElement.textContent = formattedDate;
    }

    // --- UTM Persistence Engine ---
    // Monitors the page to inject parameters into any dynamic buttons
    function applyParamsToButtons() {
        const currentParams = new URLSearchParams(window.location.search);
        if (currentParams.toString() === "") return;

        // Find all valid links (excluding anchors and javascript:)
        const links = document.querySelectorAll('a:not([href^="#"]):not([href^="javascript:"])');

        links.forEach(link => {
            try {
                const href = link.href;
                if (!href) return;

                let buttonUrl = new URL(href);

                // Pass all current URL parameters to the link
                currentParams.forEach((value, key) => {
                    buttonUrl.searchParams.set(key, value);
                });

                // Update the link with preserved parameters
                link.href = buttonUrl.toString();
            } catch (e) {
                // Ignore URL parse errors
            }
        });
    }

    // Apply immediately
    applyParamsToButtons();

    // Monitor for dynamically added links
    const observer = new MutationObserver((mutations) => {
        applyParamsToButtons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Backup: Execute every 2 seconds to ensure no links escape
    setInterval(applyParamsToButtons, 2000);

});
