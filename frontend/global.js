const socket = new WebSocket("http://127.0.0.1:5000/socket/alert");

socket.addEventListener("open", () => {
  console.log("WebSocket connection established");
});

socket.addEventListener("close", () => {
  socket.send("WebSocket connection closed");
});

export { socket };
