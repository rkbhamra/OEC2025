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
      addLine(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  socket.send("New report submitted");
//   window.location.href = "../submitted";
}

function addLine(data) {
    // console.log(data)
    // Array.from(data).map(row => <RowRender key={id.row} row={row} />)
    // let myMap = Array.from(data).map(row => <RowRender key={id.row} row={row} />)
    // console.log(myMap)
    data['data'].forEach(element => {
        console.log(element);
        
    });

    // Prepare data for the chart
    const labels = data.map(item => item['Week-end-date']);
    const testsData = data.map(item => item.tests);
    const detectionsData = data.map(item => item.detections);
    const positivityData = data.map(item => item.positivity);

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Tests',
            data: testsData,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          },
          {
            label: 'Detections',
            data: detectionsData,
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: false
          },
          {
            label: 'Positivity',
            data: positivityData,
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
}