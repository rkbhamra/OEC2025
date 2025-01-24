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

  console.log("aaa")
  const data = await getData(city);
  console.log(data)
}

init();
