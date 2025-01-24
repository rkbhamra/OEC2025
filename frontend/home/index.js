async function getUserLocation() {
  return fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then((data) => {
      return fetch(`https://api.ipapi.is?q=${data.ip}`).then((res2) => res2.json());
    });
}

async function getData(city) {
  return fetch(`http://127.0.0.1:5000/data/${city}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

async function init() {
  const userLocation = await getUserLocation();
  const city = userLocation.location.city;
  document.getElementById("city").innerText = city;
  let d = document.getElementById("latest");

  const data = await getData(city);

  data["data"].forEach((e) => {
    // id, city, province, country, type, totalreports, status, lat, long, time
    // [(1, 'Hamilton', 'ON', 'Canada', 1, 3, 1, 43.2501, -79.8496, datetime.datetime(2025, 1, 24, 3, 19, 30))]
    // e is an array of the above
    const block = document.createElement("div");
    block.className = "report-block";
    block.innerHTML = `
      <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Report ID: ${e[0]}</h5>
        <p class="card-text"><strong>City:</strong> ${e[1]}</p>
        <p class="card-text"><strong>Province:</strong> ${e[2]}</p>
        <p class="card-text"><strong>Country:</strong> ${e[3]}</p>
        <p class="card-text"><strong>Type:</strong> ${e[4]}</p>
        <p class="card-text"><strong>Total Reports:</strong> ${e[5]}</p>
        <p class="card-text"><strong>Status:</strong> ${e[6]}</p>
        <p class="card-text"><strong>Latitude:</strong> ${e[7]}</p>
        <p class="card-text"><strong>Longitude:</strong> ${e[8]}</p>
        <p class="card-text"><strong>Time:</strong> ${new Date(e[9]).toLocaleString()}</p>
      </div>
      </div>
    `;
    d.appendChild(block);
  });
}

init();
