const menuButton =
    document.getElementById("menuButton");

const closeMenu =
    document.getElementById("closeMenu");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.add("open");

    });

}


if (closeMenu) {

    closeMenu.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

    });

}


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

        });

    });


const watchlistButton =
    document.getElementById("watchlistButton");


if (watchlistButton) {

    watchlistButton.addEventListener("click", () => {

        alert(
            "Listeye eklemek için önce hesabına giriş yapmalısın."
        );

        window.location.href = "login.html";

    });

}
