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


function addEvents(data) {
    updateEventViewer(data.event1)
}

function updateEventViewer(data) {
    if (!data) {
        console.error("No data was given to updateEventViewer()!");
        return;
    }

    const eventViewer = document.querySelector("#eventViewer");

    const title = eventViewer.querySelector(".title");
    const time = eventViewer.querySelector(".time");
    const description = eventViewer.querySelector(".description");
    const images = eventViewer.querySelector(".images");

    title.textContent = data.Name;
    time.textContent = `${data.StartTime} - ${data.EndTime}`;
    description.textContent = data.Description;
    addImagesToEventViewer(images, data.Images);
}


function checkImageExists(url, callback) {
    const img = new Image();
    img.onload = function () {
        console.log("noproblemo")
        callback(true);
    };
    img.onerror = function (e) {
        e.preventDefault();
        console.log("problemo")
        callback(false);
    };
    img.src = url;
}

function addImagesToEventViewer(container, data) {
    for (const key in data) {
        console.log(key, data[key])

        const imageUrl = `./assets/images/${data[key]}`;

        checkImageExists(imageUrl, (exists) => {
            if (exists) {
                const imgContainer = document.createElement("div");
                imgContainer.classList.add("image");

                const img = document.createElement("img");
                img.src = imageUrl;

                imgContainer.append(img);
                container.append(imgContainer);
            } else {
                console.error(`Failed to load image: ${imageUrl}`);
            }
        });
    }
}



function scrollTo(target) {
    target.scrollIntoView({ behavior: "smooth" });
}



window.onload = () => {
    document.querySelector("#footer .copyright .time").textContent = new Date().getFullYear();


    getJSON("/assets/json/events.json", (data) => {
        addEvents(data);
    });

    // ------------------------ \\
    document.querySelectorAll(".event").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            scrollTo(document.querySelector("#eventViewer"));
        });
    });
    // ------------------------ \\

    document.querySelectorAll(".button.scrollToTop").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            scrollTo(document.querySelector("#main"));
        });
    });

    const scrollToTopButton = document.querySelector("#scrollToTop");
    window.addEventListener("scroll", (e) => {
        e.preventDefault();
        if (window.scrollY >= 500) scrollToTopButton.classList.add("active");
        else scrollToTopButton.classList.remove("active");
    });
}