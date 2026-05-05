// 🔐 Protect page
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

// 👤 User info
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  const welcome = document.getElementById("welcomeText");
  if (welcome) {
    welcome.innerText = `Welcome, ${user.name}`;
  }
}

// 📊 Load crypto
async function loadCrypto() {
  try {
    const res = await fetch("http://localhost:5000/api/crypto");
    const data = await res.json();

    const container = document.getElementById("cryptoContainer");
    container.innerHTML = "";

    data.forEach(coin => {
      container.innerHTML += `
        <div class="card">
          <img src="images/${coin.image}" width="40">

          <h3>${coin.name} (${coin.symbol})</h3>

          <p>$${coin.price}</p>

          <p style="color:${coin.change24h >= 0 ? 'green' : 'red'}">
            ${coin.change24h}%
          </p>

          <button onclick="addToWatchlist('${coin._id}')">
            ⭐ Watch
          </button>
        </div>
      `;
    });

  } catch (err) {
    console.log(err);
  }
}

loadCrypto();
setInterval(loadCrypto, 15000);

// ⭐ Watchlist
async function addToWatchlist(coinId) {
  const token = localStorage.getItem("token");

  await fetch("http://localhost:5000/api/watchlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ coinId })
  });

  alert("Added to watchlist ⭐");
}
<footer style="text-align:center; padding:15px; font-size:12px; color:gray;">
  Demo Project – For educational purposes only. Do not enter real personal information.
</footer>