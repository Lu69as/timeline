function getJSON(path = "", functionCall) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            functionCall(json);
        })
        .catch(() => {
            this.dataError = true;
        })
}

getJSON("/assets/json/events.json", (data) => {
    console.log(data)
});


document.querySelector(".footer .copyright .time").textContent = new Date().getFullYear();