function populateDisasters() {
  const select = document.getElementById("dtypeDropdown")
  // let cat = getCategories()
  select.append()
}

const svSlider = document.getElementById("severitySlider")
const svOut = document.getElementById("severityOut")

svSlider.oninput = function() {
  svOut.innerHTML = this.value
}

async function getNear() {
  const city = document.getElementById("citySrch").value

  fetch("http://127.0.0.1:5000/data/" + city, {
    method: "GET"
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

}

async function submitReport() {
  const type = document.getElementById("disasterType").value;
  const img = document.getElementById("disasterImage").files[0];
  const svSliderSubmit = document.getElementById("severitySlider").value

  let city = ""
  let prov = ""
  let country = ""
  let gpslat = ""
  let gpslong = ""
  console.log(svSliderSubmit)

  fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fetch(`https://api.ipapi.is?q=${data.ip}`)
        .then((res2) => res2.json())
        .then((data2) => {
          city = data2.location.city;
          prov = data2.location.state
          country = data2.location.country
          gpslat = data2.location.latitude
          gpslong = data2.location.longitude
          console.log(data2);
        });
    });

  fetch("http://127.0.0.1:5000/submit", {
    method: "POST",
    body: JSON.stringify({
      city,
      prov,
      country,
      type,
      svSliderSubmit,
      gpslat,
      gpslong
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
