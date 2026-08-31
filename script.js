const movies = [

  {
    id: 1,
    title: "Gece Yolculuğu",
    type: "film",
    year: 2026,
    rating: 8.9,
    genres: ["Aksiyon","Gerilim"],
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=85",
    description: "Şehrin karanlık sokaklarında başlayan gizemli bir yolculuk, beklenmedik bir sırrı ortaya çıkarır."
  },

  {
    id: 2,
    title: "Son Sinyal",
    type: "film",
    year: 2025,
    rating: 8.7,
    genres: ["Bilim Kurgu","Gerilim"],
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=700&q=85",
    description: "Dünyaya ulaşan son sinyal insanlığın geleceğini değiştirebilecek bir mesaj taşır."
  },

  {
    id: 3,
    title: "Kayıp Şehir",
    type: "film",
    year: 2026,
    rating: 8.5,
    genres: ["Macera","Dram"],
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=85",
    description: "Yıllardır aranan kayıp şehir bulunduğunda ekip kendisini tehlikeli bir bilmecenin içinde bulur."
  },

  {
    id: 4,
    title: "Gölgeler",
    type: "dizi",
    year: 2026,
    rating: 9.2,
    genres: ["Suç","Gerilim"],
    poster: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?auto=format&fit=crop&w=700&q=85",
    description: "Bir dedektif şehrin en güçlü suç ağının izini sürerken kendi geçmişiyle yüzleşir."
  },

  {
    id: 5,
    title: "Yıldız Tozu",
    type: "film",
    year: 2025,
    rating: 8.1,
    genres: ["Romantik","Dram"],
    poster: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85",
    description: "Tesadüfen karşılaşan iki insanın hayatını değiştiren unutulmaz bir yaz."
  },

  {
    id: 6,
    title: "Sınır Hattı",
    type: "dizi",
    year: 2025,
    rating: 8.8,
    genres: ["Aksiyon","Suç"],
    poster: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=85",
    description: "Sınırdaki gizli operasyon ekibin hiç beklemediği bir tehditle karşılaşmasına neden olur."
  },

  {
    id: 7,
    title: "Derinlik",
    type: "film",
    year: 2024,
    rating: 8.3,
    genres: ["Bilim Kurgu","Macera"],
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=85",
    description: "Okyanusun derinliklerinde bulunan bilinmeyen yapı insanlık tarihini yeniden yazabilir."
  },

  {
    id: 8,
    title: "Karanlık Oda",
    type: "dizi",
    year: 2026,
    rating: 9.0,
    genres: ["Korku","Gizem"],
    poster: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&w=700&q=85",
    description: "Yeni taşındığı evde gizli bir oda bulan genç kadın evin geçmişini araştırmaya başlar."
  },

  {
    id: 9,
    title: "İlk Işık",
    type: "film",
    year: 2023,
    rating: 7.9,
    genres: ["Dram"],
    poster: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=85",
    description: "Hayatını yeniden kurmaya çalışan bir adamın umut dolu hikâyesi."
  },

  {
    id: 10,
    title: "Kod 404",
    type: "dizi",
    year: 2026,
    rating: 9.1,
    genres: ["Bilim Kurgu","Suç"],
    poster: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=700&q=85",
    description: "Bir yazılım mühendisi dünyadaki tüm sistemleri etkileyebilecek gizli bir kod keşfeder."
  }

];


let favorites =
  JSON.parse(localStorage.getItem("filmkeyfi_favorites")) || [];


const $ = selector => document.querySelector(selector);


function escapeHTML(value) {

  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


function movieCard(movie) {

  const isFavorite = favorites.includes(movie.id);

  return `

    <article class="movie-card" data-id="${movie.id}">

      <div class="poster">

        <img
          src="${movie.poster}"
          loading="lazy"
          alt="${escapeHTML(movie.title)}"
        >

        <div class="rating">
          <b>★</b> ${movie.rating}
        </div>

        <button
          class="favorite-button ${isFavorite ? "active" : ""}"
          data-favorite="${movie.id}"
          aria-label="Favorilere ekle"
        >
          ${isFavorite ? "♥" : "♡"}
        </button>

      </div>

      <div class="movie-name">
        ${escapeHTML(movie.title)}
      </div>

      <div class="movie-meta">
        ${movie.year}
        •
        ${movie.type === "dizi" ? "Dizi" : "Film"}
        •
        ${escapeHTML(movie.genres[0])}
      </div>

    </article>

  `;
}


function renderMovies(list, target) {

  const element = $(target);

  if (!element) return;

  element.innerHTML =
    list.length
      ? list.map(movieCard).join("")
      : `
        <div style="
          grid-column:1/-1;
          padding:50px;
          text-align:center;
          color:#777;
        ">
          Sonuç bulunamadı.
        </div>
      `;

}


function updateFavorites() {

  $("#favoriteCount").textContent = favorites.length;

  const list =
    movies.filter(movie => favorites.includes(movie.id));

  renderMovies(list, "#favoriteMovies");

  $("#emptyFavorites").style.display =
    list.length ? "none" : "block";

}


function toggleFavorite(id) {

  if (favorites.includes(id)) {

    favorites =
      favorites.filter(movieId => movieId !== id);

    showToast("Favorilerden çıkarıldı");

  } else {

    favorites.push(id);

    showToast("Favorilere eklendi ❤️");

  }

  localStorage.setItem(
    "filmkeyfi_favorites",
    JSON.stringify(favorites)
  );

  refresh();

}


function openMovie(id) {

  const movie =
    movies.find(item => item.id === id);

  if (!movie) return;

  $("#detailContent").innerHTML = `

    <div class="detail-layout">

      <img
        src="${movie.poster}"
        alt="${escapeHTML(movie.title)}"
      >

      <div>

        <small style="
          color:#ff176f;
          letter-spacing:2px;
          font-weight:900;
        ">
          ${movie.type === "dizi" ? "DİZİ" : "FİLM"}
          •
          ${movie.year}
        </small>

        <h2>${escapeHTML(movie.title)}</h2>

        <div style="color:#aaa">
          ★ ${movie.rating}
          &nbsp; • &nbsp;
          ${movie.genres.map(escapeHTML).join(" • ")}
        </div>

        <p>
          ${escapeHTML(movie.description)}
        </p>

        <div class="detail-tags">

          ${movie.genres
            .map(g => `<span>${escapeHTML(g)}</span>`)
            .join("")}

        </div>

        <div class="detail-actions">

          <button
            class="neon-button"
            onclick="openPlayer(${movie.id})"
          >
            ▶ Oynat
          </button>

          <button
            class="glass-button"
            onclick="toggleFavorite(${movie.id})"
          >
            ${favorites.includes(movie.id)
              ? "♥ Favoriden Çıkar"
              : "♡ Favoriye Ekle"}
          </button>

        </div>

      </div>

    </div>

  `;

  $("#detailOverlay").classList.add("active");

}


function openPlayer(id) {

  const movie =
    movies.find(item => item.id === id);

  if (!movie) return;

  $("#playerTitle").textContent =
    movie.title;

  $("#detailOverlay").classList.remove("active");

  $("#playerOverlay").classList.add("active");

}


function closePlayer() {

  $("#playerOverlay").classList.remove("active");

}


function closeDetail() {

  $("#detailOverlay").classList.remove("active");

}


function openRandomMovie() {

  const movie =
    movies[Math.floor(Math.random() * movies.length)];

  openMovie(movie.id);

}


function filterGenre(genre) {

  const result =
    movies.filter(movie =>
      movie.genres.includes(genre)
    );

  $("#filterTitle").textContent = genre;

  renderMovies(result, "#filterMovies");

  $("#filterSection")
    .scrollIntoView({ behavior:"smooth" });

}


function showAll() {

  $("#filterTitle").textContent =
    "Tüm İçerikler";

  renderMovies(
    movies,
    "#filterMovies"
  );

  $("#filterSection")
    .scrollIntoView({ behavior:"smooth" });

}


function scrollToMovies() {

  $("#movies")
    .scrollIntoView({ behavior:"smooth" });

}


function showToast(message) {

  const toast = $("#toast");

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);

}


function refresh() {

  renderMovies(
    movies.slice(0,5),
    "#featuredMovies"
  );

  renderMovies(
    [...movies]
      .sort((a,b) => b.rating - a.rating)
      .slice(0,5),
    "#popularMovies"
  );

  renderMovies(
    movies
      .filter(movie => movie.type === "dizi"),
    "#seriesMovies"
  );

  updateFavorites();

}


/* SEARCH */

$("#openSearch").addEventListener("click", () => {

  $("#searchOverlay").classList.add("active");

  $("#searchInput").focus();

});


$("#closeSearch").addEventListener("click", () => {

  $("#searchOverlay").classList.remove("active");

});


$("#searchInput").addEventListener("input", event => {

  const query =
    event.target.value
      .trim()
      .toLocaleLowerCase("tr-TR");

  if (!query) {

    $("#searchResults").innerHTML = "";

    return;

  }

  const results =
    movies.filter(movie => {

      const text =
        [
          movie.title,
          movie.type,
          ...movie.genres
        ]
        .join(" ")
        .toLocaleLowerCase("tr-TR");

      return text.includes(query);

    });

  renderMovies(results, "#searchResults");

});


/* CLICK HANDLER */

document.addEventListener("click", event => {

  const favorite =
    event.target.closest("[data-favorite]");

  if (favorite) {

    event.stopPropagation();

    toggleFavorite(
      Number(favorite.dataset.favorite)
    );

    return;

  }

  const card =
    event.target.closest(".movie-card");

  if (card) {

    openMovie(
      Number(card.dataset.id)
    );

  }

});


/* MOBILE MENU */

$("#mobileMenu").addEventListener("click", () => {

  $("#nav").classList.toggle("active");

});


/* CLOSE ON BACKDROP */

["searchOverlay","detailOverlay","playerOverlay"]
.forEach(id => {

  $( "#" + id ).addEventListener("click", event => {

    if (event.target.id === id) {

      event.target.classList.remove("active");

    }

  });

});


/* ESCAPE */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    document
      .querySelectorAll(".overlay.active")
      .forEach(el =>
        el.classList.remove("active")
      );

  }

});


/* START */

refresh();

renderMovies(
  movies,
  "#filterMovies"
);
