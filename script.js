let kodeAdmin = "aa"; // Ganti dengan kode admin yang Anda inginkan
let players = []; // Array untuk menyimpan nama player

function checkKode() {
  let kodeInput = document.getElementById("kode").value;
  if (kodeInput === kodeAdmin) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("game-form").style.display = "block";
  } else {
    alert("Kode salah!");
  }
}

function startVoting() {
  let namaPlayer = document.getElementById("nama").value;
  players.push(namaPlayer); // Tambah nama player ke array

  document.getElementById("game-form").style.display = "none";
  document.getElementById("voting-area").style.display = "block";

  // Tambah player ke list voting
  let playersList = document.getElementById("players-list");
  for (let i = 0; i < players.length; i++) {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
      <input type="checkbox" id="player-${i}" name="player-${i}">
      <label for="player-${i}">${players[i]}</label>
    `;
    playersList.appendChild(listItem);
  }
}

function submitVotes() {
  // Hitung voting untuk masing-masing player
  let voteCounts = {};
  for (let i = 0; i < players.length; i++) {
    if (document.getElementById(`player-${i}`).checked) {
      if (voteCounts[players[i]]) {
        voteCounts[players[i]]++;
      } else {
        voteCounts[players[i]] = 1;
      }
    }
  }

  // Cari player dengan vote terendah
  let lowestVote = Infinity;
  let punishedPlayer = "";
  for (let player in voteCounts) {
    if (voteCounts[player] < lowestVote) {
      lowestVote = voteCounts[player];
      punishedPlayer = player;
    }
  }

  // Tampilkan hasil
  document.getElementById("voting-area").style.display = "none";
  document.getElementById("results-area").style.display = "block";
  document.getElementById("results-text").innerText = `Player yang mendapatkan hukuman adalah: ${punishedPlayer}`;

  createBarChart();
}

function createBarChart() {
  const ctx = document.getElementById('barChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: Object.keys(voteCounts),
      datasets: [{
        label: 'Jumlah Voting',
        data: Object.values(voteCounts),
        backgroundColor: generateRandomColors(Object.keys(voteCounts).length), 
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: { 
          beginAtZero: true
        }
      }
    }
  });
}

 

 // Fungsi untuk menghasilkan warna acak
 function generateRandomColors(numColors) {
   const colors = [];
   for (let i = 0; i < numColors; i++) {
     const r = Math.floor(Math.random() * 256);
     const g = Math.floor(Math.random() * 256);
     const b = Math.floor(Math.random() * 256);
     colors.push(`rgba(${r}, ${g}, ${b}, 0.2)`); // Sesuaikan alpha (kekeruhan) jika perlu
   }
   return colors;
 }
 

