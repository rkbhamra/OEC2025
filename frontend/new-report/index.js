const locText = document.getElementById("locText")

let latText = document.getElementById("lat")
let longText = document.getElementById("long")

function getLocationInformation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
        // console.log(a)
    } else {
        locText.innerHTML = "Access denied."
    }
}

function showPosition(pos) {
    locText.innerHTML = "Location: " + pos.coords.latitude + ", " + pos.coords.longitude
    latText.innerHTML = pos.coords.latitude
    longText.innerHTML = pos.coords.longitude
    // locText.innerHTML = "aaaaaaaa"
}

let newReport = document.getElementById("newReportForm")

newReport.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(latText.innerHTML)
})