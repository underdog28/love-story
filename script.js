/* =========================================================
   LOVE STORY — THE BOYFRIEND EDITION
   MAIN SCRIPT
========================================================= */

const openMagazineButton =
    document.getElementById("openMagazine");

const cover =
    document.getElementById("cover");

const magazine =
    document.getElementById("magazine");

const magazineMusic =
    document.getElementById("magazineMusic");

const magazinePages =
    document.querySelectorAll(".magazine-page");

let currentPage = 0;


/* =========================================================
   OPEN MAGAZINE
========================================================= */

openMagazineButton.addEventListener("click", () => {

    cover.style.display = "none";

    magazine.classList.add("visible");

    magazinePages.forEach((page) => {
        page.classList.remove("active-page");
    });

    currentPage = 0;

    magazinePages[currentPage].classList.add(
        "active-page"
    );

    updateNavigation();


    /* START MUSIC */

    if (magazineMusic) {

        magazineMusic.currentTime = 0;

        magazineMusic.play().catch((error) => {
            console.log(
                "Music could not start:",
                error
            );
        });
    }

});


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(index) {

    if (
        index < 0 ||
        index >= magazinePages.length
    ) {
        return;
    }

    magazinePages.forEach((page) => {
        page.classList.remove("active-page");
    });

    currentPage = index;

    magazinePages[currentPage].classList.add(
        "active-page"
    );

    updateNavigation();
}


/* =========================================================
   NAVIGATION CONTROLS
========================================================= */

function createNavigation() {

    const navigation =
        document.createElement("div");

    navigation.className =
        "magazine-navigation";

    navigation.innerHTML = `
        <button
            class="nav-button prev-button"
            aria-label="Previous page"
        >
            ←
        </button>

        <div class="page-counter">

            <span class="current-page">
                01
            </span>

            <span class="counter-line"></span>

            <span class="total-pages">
                ${String(
                    magazinePages.length
                ).padStart(2, "0")}
            </span>

        </div>

        <button
            class="nav-button next-button"
            aria-label="Next page"
        >
            →
        </button>
    `;

    magazine.appendChild(navigation);


    const previousButton =
        navigation.querySelector(
            ".prev-button"
        );

    const nextButton =
        navigation.querySelector(
            ".next-button"
        );


    previousButton.addEventListener(
        "click",
        () => {

            if (currentPage > 0) {

                showPage(
                    currentPage - 1
                );

            }

        }
    );


    nextButton.addEventListener(
        "click",
        () => {

            if (
                currentPage <
                magazinePages.length - 1
            ) {

                showPage(
                    currentPage + 1
                );

            }

        }
    );

}


/* =========================================================
   UPDATE PAGE COUNTER
========================================================= */

function updateNavigation() {

    const currentPageNumber =
        document.querySelector(
            ".current-page"
        );

    const previousButton =
        document.querySelector(
            ".prev-button"
        );

    const nextButton =
        document.querySelector(
            ".next-button"
        );


    if (!currentPageNumber) {
        return;
    }


    currentPageNumber.textContent =
        String(
            currentPage + 1
        ).padStart(2, "0");


    previousButton.disabled =
        currentPage === 0;


    nextButton.disabled =
        currentPage ===
        magazinePages.length - 1;

}


/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !magazine.classList.contains(
                "visible"
            )
        ) {
            return;
        }


        if (
            event.key === "ArrowRight"
        ) {

            if (
                currentPage <
                magazinePages.length - 1
            ) {

                showPage(
                    currentPage + 1
                );

            }

        }


        if (
            event.key === "ArrowLeft"
        ) {

            if (currentPage > 0) {

                showPage(
                    currentPage - 1
                );

            }

        }

    }
);


/* =========================================================
   TOUCH / FINGER SWIPE
========================================================= */

let touchStartX = 0;
let touchStartY = 0;

let touchEndX = 0;
let touchEndY = 0;


magazine.addEventListener(
    "touchstart",
    (event) => {

        if (
            !magazine.classList.contains(
                "visible"
            )
        ) {
            return;
        }


        touchStartX =
            event.changedTouches[0].screenX;

        touchStartY =
            event.changedTouches[0].screenY;

    },
    {
        passive: true
    }
);


magazine.addEventListener(
    "touchend",
    (event) => {

        if (
            !magazine.classList.contains(
                "visible"
            )
        ) {
            return;
        }


        touchEndX =
            event.changedTouches[0].screenX;

        touchEndY =
            event.changedTouches[0].screenY;


        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const swipeDistanceX =
        touchEndX - touchStartX;

    const swipeDistanceY =
        touchEndY - touchStartY;


    const minimumSwipeDistance = 60;


    if (
        Math.abs(swipeDistanceX) <
        minimumSwipeDistance
    ) {
        return;
    }


    if (
        Math.abs(swipeDistanceX) <
        Math.abs(swipeDistanceY)
    ) {
        return;
    }


    /* SWIPE LEFT = NEXT */

    if (swipeDistanceX < 0) {

        if (
            currentPage <
            magazinePages.length - 1
        ) {

            showPage(
                currentPage + 1
            );

        }

    }


    /* SWIPE RIGHT = PREVIOUS */

    else {

        if (currentPage > 0) {

            showPage(
                currentPage - 1
            );

        }

    }

}


/* =========================================================
   PAGE 04 — CAMERA INTERACTION
========================================================= */

const cameraYes =
    document.getElementById("cameraYes");

const cameraNo =
    document.getElementById("cameraNo");

const cameraResponse =
    document.getElementById(
        "cameraResponse"
    );

const cameraPage =
    document.getElementById(
        "page-04"
    );


if (
    cameraYes &&
    cameraNo
) {


    /* YES — TAKE PHOTO */

    cameraYes.addEventListener(
        "click",
        () => {

            cameraPage.classList.add(
                "camera-flash"
            );


            cameraResponse.textContent =
                "";


            /* FLASH */

            setTimeout(() => {

                cameraPage.classList.remove(
                    "camera-flash"
                );


                cameraPage.classList.add(
                    "photo-developed"
                );

            }, 450);


            /* THEN GO TO PAGE 05 */

            setTimeout(() => {

                cameraPage.classList.remove(
                    "photo-developed"
                );


                showPage(
                    currentPage + 1
                );

            }, 1400);

        }
    );


    /* NO — STAY ON PAGE */

    cameraNo.addEventListener(
        "click",
        () => {

            cameraResponse.textContent =
                "No? Seriously? You wanna die?";

        }
    );

}

/* =========================================================
   PAGE 05 — SAVE AWARD AS PNG
========================================================= */

const saveAwardButton = document.getElementById("saveAward");
const awardCertificate = document.querySelector(".award-certificate");
const awardSaveMessage = document.getElementById("awardSaveMessage");

if (saveAwardButton && awardCertificate) {

    saveAwardButton.addEventListener("click", async () => {

        // Prevent multiple clicks while generating
        if (saveAwardButton.classList.contains("saving")) return;

        saveAwardButton.classList.add("saving");
        saveAwardButton.textContent = "SAVING AWARD...";

        try {

            const canvas = await html2canvas(awardCertificate, {
                scale: 3,
                useCORS: true,
                backgroundColor: "#fffaf0",
                logging: false
            });

            // Convert certificate to PNG
            canvas.toBlob((blob) => {

                if (!blob) {
                    throw new Error("Could not create PNG.");
                }

                const downloadURL = URL.createObjectURL(blob);

                const downloadLink = document.createElement("a");

                downloadLink.href = downloadURL;
                downloadLink.download = "Best_Boyfriend_Award_2026.png";

                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                URL.revokeObjectURL(downloadURL);

                // Update button
                saveAwardButton.textContent = "AWARD DOWNLOADED ♡";
                saveAwardButton.classList.remove("saving");
                saveAwardButton.classList.add("award-accepted");

                if (awardSaveMessage) {
                    
                }

            }, "image/png");

        } catch (error) {

            console.error("Certificate download failed:", error);

            saveAwardButton.textContent = "TRY AGAIN ♡";
            saveAwardButton.classList.remove("saving");

            if (awardSaveMessage) {
                awardSaveMessage.textContent =
                    "Oh! Did I fuck up? Please try again.";
            }
        }
    });
}




/* =========================================================
   INITIALISE NAVIGATION
========================================================= */

createNavigation();

/* =========================================================
   FADE NAVIGATION AFTER PAGE OPENS
========================================================= */

const navigation =
    document.querySelector(".magazine-navigation");

let navigationFadeTimer;


function refreshNavigationVisibility() {

    if (!navigation) {
        return;
    }

    navigation.classList.remove(
        "navigation-idle"
    );

    clearTimeout(
        navigationFadeTimer
    );

    navigationFadeTimer =
        setTimeout(() => {

            navigation.classList.add(
                "navigation-idle"
            );

        }, 2000);
}


/* WHEN PAGE CHANGES */

const originalShowPage =
    showPage;

showPage = function(index) {

    originalShowPage(index);

    refreshNavigationVisibility();
};


/* INITIAL STATE */

refreshNavigationVisibility();