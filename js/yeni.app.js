/* =====================================================
   FILMKEYFİ - TMDB API
===================================================== */

const API_KEY = "BURAYA_TMDB_API_KEY";
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

/* Türkçe ayarlar */
const API_LANGUAGE = "tr-TR";

/* =====================================================
   API İSTEĞİ
===================================================== */

async function apiRequest(endpoint) {

    try {

        const response = await fetch(
            `${API_URL}${endpoint}&api_key=${API_KEY}&language=${API_LANGUAGE}`
        );

        if (!response.ok) {
            throw new Error(
                `API hatası: ${response.status}`
            );
        }

        return await response.json();

    } catch (error) {

        console.error("Film API bağlantı hatası:", error);

        return null;
    }
}

/* =====================================================
   POPÜLER FİLMLER
===================================================== */

async function getPopularMovies() {

    const data = await apiRequest(
        "/movie/popular?page=1"
    );

    if (!data || !data.results) {
        return;
    }

    renderMovies(
        data.results,
        "featuredMovies"
    );
}

/* =====================================================
   FİLM KARTLARINI OLUŞTUR
===================================================== */

function renderMovies(movies, containerId) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.innerHTML = "";

    movies.forEach(movie => {

        const poster = movie.poster_path
            ? IMAGE_URL + movie.poster_path
            : "assets/no-poster.jpg";

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

        const card = document.createElement("article");

        card.className = "movie-card";

        card.innerHTML = `
            <div
                class="poster"
                style="
                    background-image:
                    linear-gradient(
                        to bottom,
                        transparent 50%,
                        rgba(0,0,0,.8)
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

        container.appendChild(card);

    });
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
   WATCHLIST
===================================================== */

const watchlistButton =
    document.getElementById("watchlistButton");

if (watchlistButton) {

    watchlistButton.addEventListener(
        "click",
        function () {

            this.classList.toggle("added");

            if (this.classList.contains("added")) {

                this.innerHTML =
                    "<span>✓</span> Listeme Eklendi";

            } else {

                this.innerHTML =
                    "<span>＋</span> Listeme Ekle";
            }

        }
    );
}

/* =====================================================
   MOBİL MENÜ
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const closeMenu =
    document.getElementById("closeMenu");

if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {
            mobileMenu.classList.add("active");
        }
    );
}

if (closeMenu && mobileMenu) {

    closeMenu.addEventListener(
        "click",
        () => {
            mobileMenu.classList.remove("active");
        }
    );
}

/* =====================================================
   SAYFA AÇILDIĞINDA
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        getPopularMovies();

    }
);
