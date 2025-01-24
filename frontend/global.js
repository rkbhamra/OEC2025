function createSocket() {
  const socket = new WebSocket("http://localhost:????");

  socket.onopen = function (event) {
    console.log("WebSocket is open now.");
  };

  socket.onmessage = function (event) {
    alert("Message from server: " + event.data);
    let socketDiv = document.querySelector("#alerts");
    let alert = document.createElement("div");
    alert.classList.add("alert");
    alert.classList.add("alert-primary");

    alert.innerHTML = event.data;
    socketDiv.appendChild(alert);
  };

  socket.onclose = function (event) {
    console.log("WebSocket is closed now.");
  };
}
