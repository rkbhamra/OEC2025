async function submitReport() {
  const type = document.getElementById("disasterType").value;
  const img = document.getElementById("disasterImage").files[0];

  fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });

  // fetch("/submit", {
  //   method: "POST",
  //   body: {
  //     type,
  //     img,
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Success:", data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
}
