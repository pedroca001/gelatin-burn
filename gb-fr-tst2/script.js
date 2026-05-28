(function () {
    var viewerCount = document.getElementById("viewer-count");
    var viewTotal = document.getElementById("view-total");

    function applyParamsToButtons() {
        var currentParams = new URLSearchParams(window.location.search);
        if (currentParams.toString() === "") return;

        var links = document.querySelectorAll('a:not([href^="#"]):not([href^="javascript:"])');

        links.forEach(function (link) {
            try {
                if (!link.href) return;

                var buttonUrl = new URL(link.href);
                currentParams.forEach(function (value, key) {
                    buttonUrl.searchParams.set(key, value);
                });

                link.href = buttonUrl.toString();
            } catch (e) {
                // Ignore invalid or browser-managed links.
            }
        });
    }

    function updateViewers() {
        if (!viewerCount) return;
        var current = Number(viewerCount.textContent.replace(/\D/g, "")) || 483;
        var next = current + Math.floor(Math.random() * 31) - 15;

        if (next < 450) next = 450 + Math.floor(Math.random() * 31);
        if (next > 560) next = 530 + Math.floor(Math.random() * 31);

        viewerCount.textContent = String(next);
    }

    function updateViews() {
        if (!viewTotal) return;
        var options = ["2,3 M", "2,4 M", "2,3 M", "2,5 M"];
        var index = 0;

        setInterval(function () {
            index = (index + 1) % options.length;
            viewTotal.textContent = options[index];
        }, 9000);
    }

    function enhanceCommentActions() {
        var actionBlocks = document.querySelectorAll(".comment-actions:not([data-enhanced])");

        actionBlocks.forEach(function (block) {
            var text = block.textContent || "";
            var match = text.match(/\d+/);
            var count = match ? match[0] : "";

            block.setAttribute("data-enhanced", "true");
            block.innerHTML = [
                '<button class="comment-action-icon comment-like" type="button" aria-label="J&apos;aime ce commentaire">',
                    '<svg viewBox="0 0 24 24" aria-hidden="true">',
                        '<path d="M9.221 1.795a1 1 0 0 1 1.109-.656l1.04.173a4 4 0 0 1 3.252 4.784L14 9h4.061a3.664 3.664 0 0 1 3.576 2.868A3.68 3.68 0 0 1 21 14.85l.02.087A3.815 3.815 0 0 1 20 18.5v.043l-.01.227a2.82 2.82 0 0 1-.135.663l-.106.282A3.754 3.754 0 0 1 16.295 22h-3.606l-.392-.007a12.002 12.002 0 0 1-5.223-1.388l-.343-.189-.27-.154a2.005 2.005 0 0 0-.863-.26l-.13-.004H3.5a1.5 1.5 0 0 1-1.5-1.5V12.5A1.5 1.5 0 0 1 3.5 11h1.79l.157-.013a1 1 0 0 0 .724-.512l.063-.145 2.987-8.535Zm-1.1 9.196A3 3 0 0 1 5.29 13H4v4.998h1.468a4 4 0 0 1 1.986.528l.27.155.285.157A10 10 0 0 0 12.69 20h3.606c.754 0 1.424-.483 1.663-1.2l.03-.126a.819.819 0 0 0 .012-.131v-.872l.587-.586c.388-.388.577-.927.523-1.465l-.038-.23-.02-.087-.21-.9.55-.744A1.663 1.663 0 0 0 18.061 11H14a2.002 2.002 0 0 1-1.956-2.418l.623-2.904a2 2 0 0 0-1.626-2.392l-.21-.035-2.71 7.741Z"></path>',
                    '</svg>',
                '</button>',
                '<span class="comment-like-count">' + count + '</span>',
                '<button class="comment-action-icon comment-dislike" type="button" aria-label="Je n&apos;aime pas ce commentaire">',
                    '<svg viewBox="0 0 24 24" aria-hidden="true">',
                        '<path d="m11.31 2 .392.007c1.824.06 3.61.534 5.223 1.388l.343.189.27.154c.264.152.56.24.863.26l.13.004H20.5a1.5 1.5 0 0 1 1.5 1.5V11.5a1.5 1.5 0 0 1-1.5 1.5h-1.79l-.158.013a1 1 0 0 0-.723.512l-.064.145-2.987 8.535a1 1 0 0 1-1.109.656l-1.04-.174a4 4 0 0 1-3.251-4.783L10 15H5.938a3.664 3.664 0 0 1-3.576-2.868A3.682 3.682 0 0 1 3 9.15l-.02-.088A3.816 3.816 0 0 1 4 5.5v-.043l.008-.227a2.86 2.86 0 0 1 .136-.664l.107-.28A3.754 3.754 0 0 1 7.705 2h3.605ZM7.705 4c-.755 0-1.425.483-1.663 1.2l-.032.126a.818.818 0 0 0-.01.131v.872l-.587.586a1.816 1.816 0 0 0-.524 1.465l.038.23.02.087.21.9-.55.744a1.686 1.686 0 0 0-.321 1.18l.029.177c.17.76.844 1.302 1.623 1.302H10a2.002 2.002 0 0 1 1.956 2.419l-.623 2.904-.034.208a2.002 2.002 0 0 0 1.454 2.139l.206.045.21.035 2.708-7.741A3.001 3.001 0 0 1 18.71 11H20V6.002h-1.47c-.696 0-1.38-.183-1.985-.528l-.27-.155-.285-.157A10.002 10.002 0 0 0 11.31 4H7.705Z"></path>',
                    '</svg>',
                '</button>',
                '<button class="comment-reply-button" type="button" aria-label="Répondre">Répondre</button>',
                '<button class="comment-more-button" type="button" aria-label="Menu d&apos;actions">',
                    '<svg viewBox="0 0 24 24" aria-hidden="true">',
                        '<path d="M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>',
                    '</svg>',
                '</button>'
            ].join("");
        });
    }

    updateViews();
    updateViewers();
    enhanceCommentActions();
    setInterval(updateViewers, 8000);

    applyParamsToButtons();

    var observer = new MutationObserver(function () {
        applyParamsToButtons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    setInterval(applyParamsToButtons, 2000);

    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        return false;
    });

    document.addEventListener("copy", function (event) {
        event.preventDefault();
        return false;
    });

    document.addEventListener("cut", function (event) {
        event.preventDefault();
        return false;
    });

    document.addEventListener("dragstart", function (event) {
        event.preventDefault();
        return false;
    });

    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && ["c", "x", "u"].indexOf(event.key.toLowerCase()) !== -1) {
            event.preventDefault();
            return false;
        }
    });
})();
