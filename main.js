const latestMusic = document.getElementById("latest-music");
const youtubePlayer = document.getElementById("youtube-player");
const searchInput = document.querySelector("search-bar");
const searchIcon = document.querySelector(".fa-search");
const searchButton = document.querySelector(".search-button");

async function getTracks() {
  const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    "https://openwhyd.org/hot?format=json"
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("API Error");
    }

    const data = await response.json();

    if (!data.tracks || data.tracks.length === 0) {
      throw new Error("No tracks found");
    }

    displayTracks(data.tracks);
  } catch (error) {
    latestMusic.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

const displayTracks = (tracks) => {
  latestMusic.innerHTML = "";

  if (tracks.length > 0) {
    const mostViewedTrack = tracks[2];

    const youtubeId = mostViewedTrack.eId.split("/yt/")[1];
    const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    youtubePlayer.src = youtubeUrl;
  }

  tracks.forEach((track) => {
    const trackItem = document.createElement("div");
    trackItem.classList.add("track-card");

    const youtubeId = track.eId.split("/yt/")[1];
    const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;

    trackItem.innerHTML = `
      <img src="${track.img}" alt="${track.name}" class="track-image">
      <h3 class="track-title">${track.name}</h3>
      <button class="play-button" data-url="${youtubeUrl}">Play</button>
    `;


    trackItem.querySelector(".play-button").addEventListener("click", (event) => {
      const url = event.target.getAttribute("data-url");
      youtubePlayer.src = url;

      document.querySelector(".upcoming").scrollIntoView({ behavior: "smooth" });
    });

    latestMusic.appendChild(trackItem);
  });
};


// Parça arama fonksiyonu
const searchTrack = async (query) => {
  const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    `https://openwhyd.org/search?q=${query}&format=json`
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("API Error");
    }

    const data = await response.json();

    // Eğer parça bulunamazsa hata fırlat
    if (!data || !data.length) {
      throw new Error("No tracks found");
    }

    // Elde edilen parçaları göster
    displayTracks(data);
  } catch (error) {
    youtubePlayer.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
};

// Arama butonu tıklama olayını dinle
searchButton.addEventListener("click", async () => {
  const trackName = searchInput.value.trim().toLowerCase();

  if (trackName === "") {
    alert("Please enter a track name!");
    return;
  }

  youtubePlayer.innerHTML = ""; // Önceki sonuçları temizle
  await searchTrack(trackName); // Yeni parçayı ara
});






document.addEventListener("DOMContentLoaded", getTracks);
