import { socket } from "../global.js";

document.submitQuery = submitQuery;
async function submitQuery() {
  const query = document.getElementById("query-text").value;
//   const img = document.getElementById("disasterImage").files[0];
//   const svSliderSubmit = "1"; // document.getElementById("severitySlider").value

//   let city = "";
//   let prov = "";
//   let country = "";
//   let gpslat = "";
//   let gpslong = "";
//   console.log(svSliderSubmit);


  console.log(query);

  fetch("http://127.0.0.1:5000/query", {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify({
      query,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  socket.send("New report submitted");
//   window.location.href = "../submitted";
}