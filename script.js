/* =========================================================
   IGOR BALANDIN — AUTHOR_37
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       YEAR
    ====================================================== */

    document.querySelectorAll(".current-year").forEach(el => {
        el.textContent = new Date().getFullYear();
    });


    /* =====================================================
       LANGUAGE
    ====================================================== */

    const languageButtons =
        document.querySelectorAll(".language-btn");

    const translatableElements =
        document.querySelectorAll("[data-de][data-en]");

    let currentLanguage =
        localStorage.getItem("igorLanguage") || "de";


    function setLanguage(language) {

        currentLanguage = language;

        document.documentElement.lang = language;

        localStorage.setItem(
            "igorLanguage",
            language
        );

        languageButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.language === language
            );

        });

        translatableElements.forEach(element => {

            const translation =
                element.dataset[language];

            if (!translation) return;

            element.textContent = translation;

        });

    }


    languageButtons.forEach(button => {

        button.addEventListener("click", () => {

            setLanguage(
                button.dataset.language
            );

        });

    });


    setLanguage(currentLanguage);


    /* =====================================================
       MENU
    ====================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const menuOverlay =
        document.getElementById("menuOverlay");

    const menuLinks =
        document.querySelectorAll(".menu-link");


    function openMenu() {

        menuOverlay.classList.add("active");

        menuButton.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("menu-open");

    }


    function closeMenu() {

        menuOverlay.classList.remove("active");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");

    }


    menuButton.addEventListener("click", () => {

        const isOpen =
            menuOverlay.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    menuLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (menuOverlay.classList.contains("active")) {
                closeMenu();
            }

            closeLegal();

        }

    });


    /* =====================================================
       SPECIAL CURSOR
    ====================================================== */

    const cursor =
        document.querySelector(".cursor");

    const cursorRing =
        document.querySelector(".cursor-ring");

    const cursorClick =
        document.querySelector(".cursor-click");

    const cursorLabel =
        document.querySelector(".cursor-label");


    const finePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        );


    if (
        cursor &&
        cursorRing &&
        finePointer.matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

            }
        );


        function animateCursor() {

            currentX +=
                (mouseX - currentX) * .16;

            currentY +=
                (mouseY - currentY) * .16;


            cursor.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        document.addEventListener(
            "mouseover",
            event => {

                const target =
                    event.target.closest(
                        "[data-cursor]"
                    );

                if (target) {

                    cursor.classList.add("hover");

                    const label =
                        target.dataset.cursor;

                    if (label) {
                        cursorLabel.textContent = label;
                    }

                }

            }
        );


        document.addEventListener(
            "mouseout",
            event => {

                const target =
                    event.target.closest(
                        "[data-cursor]"
                    );

                if (
                    target &&
                    !target.contains(event.relatedTarget)
                ) {

                    cursor.classList.remove("hover");

                }

            }
        );


        document.addEventListener(
            "mousemove",
            event => {

                const book =
                    event.target.closest(".book-object");

                if (book) {

                    cursor.classList.add(
                        "book-hover"
                    );

                } else {

                    cursor.classList.remove(
                        "book-hover"
                    );

                }

            }
        );


        document.addEventListener(
            "mousedown",
            event => {

                cursorClick.style.left =
                    `${event.clientX}px`;

                cursorClick.style.top =
                    `${event.clientY}px`;

                cursorClick.classList.remove(
                    "active"
                );

                void cursorClick.offsetWidth;

                cursorClick.classList.add(
                    "active"
                );

            }
        );

    }


    /* =====================================================
       PORTRAIT
    ====================================================== */

    const photoContainer =
        document.querySelector(
            ".photo-container"
        );

    const authorPhoto =
        document.querySelector(
            ".author-photo"
        );


    if (
        photoContainer &&
        authorPhoto
    ) {

        photoContainer.addEventListener(
            "click",
            event => {

                /*
                   Verhindert doppelte Aktion,
                   wenn direkt der Button geklickt wird.
                */

                if (
                    event.target.closest(
                        ".photo-trigger"
                    )
                ) {
                    return;
                }

                photoContainer.classList.toggle(
                    "color-active"
                );

            }
        );


        const photoTrigger =
            document.querySelector(
                ".photo-trigger"
            );


        if (photoTrigger) {

            photoTrigger.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    photoContainer.classList.toggle(
                        "color-active"
                    );

                }
            );

        }

    }


    /* =====================================================
       TERMINAL
    ====================================================== */

    const terminalText =
        document.getElementById(
            "terminalText"
        );


    if (terminalText) {

        const terminalLines = [
            "write_first_book();",
            "turn_ideas_into_words();",
            "create_something_real();",
            "publish_story();"
        ];

        let lineIndex = 0;
        let characterIndex = 0;
        let deleting = false;


        function terminalType() {

            const currentLine =
                terminalLines[lineIndex];


            if (!deleting) {

                characterIndex++;

                terminalText.textContent =
                    currentLine.substring(
                        0,
                        characterIndex
                    );


                if (
                    characterIndex >=
                    currentLine.length
                ) {

                    deleting = true;

                    setTimeout(
                        terminalType,
                        1800
                    );

                    return;

                }

            } else {

                characterIndex--;

                terminalText.textContent =
                    currentLine.substring(
                        0,
                        characterIndex
                    );


                if (characterIndex <= 0) {

                    deleting = false;

                    lineIndex =
                        (lineIndex + 1) %
                        terminalLines.length;

                }

            }


            setTimeout(
                terminalType,
                deleting ? 35 : 65
            );

        }


        terminalType();

    }


    /* =====================================================
       PROGRESS BAR
    ====================================================== */

    const progressBar =
        document.querySelector(
            ".progress-bar"
        );


    if (progressBar) {

        let animated = false;


        const progressObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !animated
                        ) {

                            animated = true;

                            setTimeout(() => {

                                progressBar.style.width =
                                    "67%";

                            }, 250);

                        }

                    });

                },
                {
                    threshold: .3
                }
            );


        progressObserver.observe(
            progressBar
        );

    }


    /* =====================================================
       PROCESS REVEAL
    ====================================================== */

    const processItems =
        document.querySelectorAll(
            ".process-item"
        );


    const processObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                });

            },
            {
                threshold: .1
            }
        );


    processItems.forEach(item => {

        item.style.opacity = "0";

        item.style.transform =
            "translateY(30px)";

        item.style.transition =
            "opacity .7s ease, transform .7s cubic-bezier(.2,.8,.2,1)";

        processObserver.observe(item);

    });


    /* =====================================================
       LEGAL MODAL
    ====================================================== */

    const legalModal =
        document.getElementById(
            "legalModal"
        );

    const legalContent =
        document.getElementById(
            "legalContent"
        );

    const legalClose =
        document.getElementById(
            "legalClose"
        );

    const legalButtons =
        document.querySelectorAll(
            ".legal-button"
        );


    const legalTexts = {

        impressum: {

            de: `
                <h2>IMPRESSUM</h2>

                <h3>Angaben gemäß § 5 TMG</h3>

                <p>
                    Igor Balandin<br>
                    [Straße und Hausnummer]<br>
                    [PLZ Ort]<br>
                    Deutschland
                </p>

                <h3>Kontakt</h3>

                <p>
                    E-Mail:
                    deine-mail@example.com
                </p>

                <p>
                    Bitte ersetze die Platzhalter vor
                    Veröffentlichung durch deine echten
                    Angaben.
                </p>
            `,

            en: `
                <h2>LEGAL NOTICE</h2>

                <h3>Information according to § 5 TMG</h3>

                <p>
                    Igor Balandin<br>
                    [Street and number]<br>
                    [ZIP City]<br>
                    Germany
                </p>

                <h3>Contact</h3>

                <p>
                    Email:
                    deine-mail@example.com
                </p>

                <p>
                    Replace the placeholders with your
                    real information before publishing.
                </p>
            `

        },


        datenschutz: {

            de: `
                <h2>DATENSCHUTZ</h2>

                <h3>Allgemeine Hinweise</h3>

                <p>
                    Der Schutz deiner persönlichen Daten
                    ist wichtig. Diese Website verwendet
                    keine Analyse- oder Tracking-Cookies.
                </p>

                <h3>Technisch notwendige Daten</h3>

                <p>
                    Beim Aufruf einer Website können durch
                    den Server technisch notwendige
                    Verbindungsdaten verarbeitet werden,
                    beispielsweise IP-Adresse, Zeitpunkt
                    des Zugriffs und angeforderte Ressource.
                </p>

                <h3>Lokale Speicherung</h3>

                <p>
                    Die gewählte Sprache und die Bestätigung
                    des Informationshinweises können lokal
                    im Browser gespeichert werden.
                </p>

                <h3>Kontakt</h3>

                <p>
                    Bei Fragen zum Datenschutz kannst du
                    dich über die angegebene E-Mail-Adresse
                    melden.
                </p>
            `,

            en: `
                <h2>PRIVACY</h2>

                <h3>General information</h3>

                <p>
                    Protecting your personal data is
                    important. This website does not use
                    analytics or tracking cookies.
                </p>

                <h3>Technically necessary data</h3>

                <p>
                    When visiting a website, technically
                    necessary connection data may be
                    processed by the server, such as IP
                    address, access time and requested
                    resource.
                </p>

                <h3>Local storage</h3>

                <p>
                    The selected language and confirmation
                    of the information notice may be stored
                    locally in your browser.
                </p>

                <h3>Contact</h3>

                <p>
                    For privacy questions, please use the
                    email address provided on the website.
                </p>
            `

        }

    };


    function openLegal(type) {

        if (!legalTexts[type]) return;

        legalContent.innerHTML =
            legalTexts[type][currentLanguage];

        legalModal.classList.add(
            "active"
        );

        legalModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "menu-open"
        );

    }


    function closeLegal() {

        if (!legalModal) return;

        legalModal.classList.remove(
            "active"
        );

        legalModal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !menuOverlay.classList.contains(
                "active"
            )
        ) {

            document.body.classList.remove(
                "menu-open"
            );

        }

    }


    legalButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openLegal(
                    button.dataset.legal
                );

            }
        );

    });


    legalClose.addEventListener(
        "click",
        closeLegal
    );


    legalModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                legalModal
            ) {

                closeLegal();

            }

        }
    );


    /* =====================================================
       PRIVACY NOTICE
    ====================================================== */

    const privacyNotice =
        document.getElementById(
            "privacyNotice"
        );

    const privacyAccept =
        document.getElementById(
            "privacyAccept"
        );


    if (
        privacyNotice &&
        privacyAccept
    ) {

        const privacyAccepted =
            localStorage.getItem(
                "igorPrivacyNotice"
            );


        if (!privacyAccepted) {

            setTimeout(() => {

                privacyNotice.classList.add(
                    "visible"
                );

            }, 1200);

        }


        privacyAccept.addEventListener(
            "click",
            () => {

                localStorage.setItem(
                    "igorPrivacyNotice",
                    "true"
                );

                privacyNotice.classList.remove(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR LINKS
    ====================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior:
                        window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches
                            ? "auto"
                            : "smooth"
                });

            }
        );

    });


    /* =====================================================
       IMAGE ERROR FALLBACK
    ====================================================== */

    if (authorPhoto) {

        authorPhoto.addEventListener(
            "error",
            () => {

                authorPhoto.style.background =
                    "linear-gradient(135deg,#151515,#303030)";

                authorPhoto.alt =
                    "Portrait nicht gefunden";

            }
        );

    }

});