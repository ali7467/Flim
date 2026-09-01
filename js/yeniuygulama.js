/* =====================================================
   FILMKEYFİ - FILM SISTEMI
===================================================== */

const API_KEY = "BURAYA_TMDB_API_KEY";

const API_URL = "https://api.themoviedb.org/3";

const IMAGE_URL =
    "https://image.tmdb.org/t/p/w500";

const API_LANGUAGE = "tr-TR";


/* =====================================================
   API
===================================================== */

async function apiRequest(endpoint) {

    try {

        const separator =
            endpoint.includes("?") ? "&" : "?";

        const response = await fetch(
            `${API_URL}${endpoint}${separator}api_key=${API_KEY}&language=${API_LANGUAGE}`
        );

        if (!response.ok) {
            throw new Error(
                `API Hatası: ${response.status}`
            );
        }

        return await response.json();

    } catch (error) {

        console.error(
            "TMDB bağlantı hatası:",
            error
        );

        return null;
    }
}


/* =====================================================
   FİLM KARTI
===================================================== */

function createMovieCard(movie) {

    const card =
        document.createElement("article");

    card.className = "movie-card";

    const poster = movie.poster_path
        ? IMAGE_URL + movie.poster_path
        : "";

    const title =
        movie.title ||
        movie.original_title ||
        "İsimsiz Film";

    const year =
        movie.release_date
            ? movie.release_date.substring(0, 4)
            : "----";

    const rating =
        movie.vote_average
            ? movie.vote_average.toFixed(1)
            : "-";


    card.innerHTML = `

        <div
            class="poster"
            style="
                background-image:
                linear-gradient(
                    to bottom,
                    transparent 45%,
                    rgba(0,0,0,.9)
                ),
                url('${poster}');
                background-size: cover;
                background-position: center;
            "
        ></div>

        <div class="movie-card-info">

            <span class="quality">
                HD
            </span>

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p>
                ${year}
                · ⭐ ${rating}
            </p>

        </div>
    `;


    /* ==============================
       FİLME TIKLAMA
    ============================== */

    card.addEventListener(
        "click",
        () => {

            if (!movie.id) {
                return;
            }

            window.location.href =
                `movie.html?id=${movie.id}`;

        }
    );


    return card;
}


/* =====================================================
   FİLM LİSTESİ
===================================================== */

function renderMovies(
    movies,
    containerId
) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (!movies || movies.length === 0) {

        container.innerHTML = `
            <div class="loading">
                Film bulunamadı.
            </div>
        `;

        return;
    }


    movies.forEach(movie => {

        const card =
            createMovieCard(movie);

        container.appendChild(card);

    });
}


/* =====================================================
   POPÜLER FİLMLER
===================================================== */

async function getPopularMovies() {

    const data =
        await apiRequest(
            "/movie/popular?page=1"
        );

    if (!data) {
        return;
    }


    /* Ana sayfa */

    if (
        document.getElementById(
            "featuredMovies"
        )
    ) {

        renderMovies(
            data.results,
            "featuredMovies"
        );

    }


    /* Filmler sayfası */

    if (
        document.getElementById(
            "moviesGrid"
        )
    ) {

        renderMovies(
            data.results,
            "moviesGrid"
        );

    }

}


/* =====================================================
   FİLM DETAY
===================================================== */

async function loadMovieDetails() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const movieId =
        params.get("id");


    if (!movieId) {
        return;
    }


    const movie =
        await apiRequest(
            `/movie/${movieId}?`
        );


    if (!movie) {
        return;
    }


    const title =
        document.getElementById(
            "movieTitle"
        );

    const originalTitle =
        document.getElementById(
            "originalTitle"
        );

    const description =
        document.getElementById(
            "movieDescription"
        );

    const poster =
        document.getElementById(
            "moviePoster"
        );


    if (title) {

        title.textContent =
            movie.title ||
            movie.original_title ||
            "Film";

    }


    if (originalTitle) {

        originalTitle.textContent =
            movie.original_title || "";

    }


    if (description) {

        description.textContent =
            movie.overview ||
            "Bu film için açıklama bulunamadı.";

    }


    if (poster && movie.poster_path) {

        poster.style.backgroundImage =
            `url('${IMAGE_URL}${movie.poster_path}')`;

    }


    /* ==============================
       META
    ============================== */

    const meta =
        document.getElementById(
            "movieMeta"
        );

    if (meta) {

        const year =
            movie.release_date
                ? movie.release_date.substring(0, 4)
                : "----";

        const rating =
            movie.vote_average
                ? movie.vote_average.toFixed(1)
                : "-";

        const runtime =
            movie.runtime
                ? `${movie.runtime} dk`
                : "Süre yok";

        meta.innerHTML = `

            <span>
                ${year}
            </span>

            <span class="rating">
                ⭐ ${rating}
            </span>

            <span>
                ${runtime}
            </span>

        `;

    }

}


/* =====================================================
   ARAMA
===================================================== */

async function searchMovies() {

    const input =
        document.getElementById(
            "searchInput"
        );

    const grid =
        document.getElementById(
            "moviesGrid"
        );

    if (!input || !grid) {
        return;
    }


    const query =
        input.value.trim();


    if (!query) {

        getPopularMovies();

        return;
    }


    grid.innerHTML = `
        <div class="loading">
            <div class="loading-circle"></div>
            Film aranıyor...
        </div>
    `;


    const data =
        await apiRequest(
            `/search/movie?query=${encodeURIComponent(query)}&page=1`
        );


    if (!data) {
        return;
    }


    renderMovies(
        data.results,
        "moviesGrid"
    );

}


/* =====================================================
   ARAMA BUTONU
===================================================== */

const searchButton =
    document.getElementById(
        "searchButton"
    );

if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchMovies
    );

}


/* ENTER İLE ARAMA */

const searchInput =
    document.getElementById(
        "searchInput"
    );

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                searchMovies();
            }

        }
    );

}


/* =====================================================
   MOBİL MENÜ
===================================================== */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );

const closeMenu =
    document.getElementById(
        "closeMenu"
    );


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {
            mobileMenu.classList.add(
                "active"
            );
        }
    );

}


if (closeMenu && mobileMenu) {

    closeMenu.addEventListener(
        "click",
        () => {
            mobileMenu.classList.remove(
                "active"
            );
        }
    );

}


/* =====================================================
   HTML GÜVENLİĞİ
===================================================== */

function escapeHTML(text) {

    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =====================================================
   SAYFA BAŞLAT
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        getPopularMovies();

        loadMovieDetails();

    }
);
