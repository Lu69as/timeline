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
    updateEventViewer(data.event1);
    const timeline = document.querySelector(".timeline");
    let eventCount = timeline.querySelectorAll(".event").length;
    console.log(eventCount);
    const container = timeline.querySelector(".container");

    for (const key in data) {
        const empty = document.createElement("div");
        empty.classList.add("marker");

        const middle = document.createElement("div");
        middle.classList.add("middle");

        const event = document.createElement("div");
        event.classList.add("event");
        event.addEventListener("click", (e) => {
            e.preventDefault();
            scrollTo(document.querySelector("#eventViewer"));
        });


        /* Hero section */
        const hero = document.createElement("div");
        hero.classList.add("hero");

        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = data[key].Name;

        const time = document.createElement("p");
        time.classList.add("time");
        time.textContent = `${data[key].StartTime} - ${data[key].EndTime}`;

        hero.append(title, time);
        /* End of Hero section */


        /* Description section */
        const description = document.createElement("p");
        description.classList.add("description");
        description.textContent = data[key].Description;
        /* End of Description section */


        eventCount++;
        event.append(hero, description);

        if (eventCount % 2) container.append(empty, middle, event);
        else container.append(event, middle, empty);
    }

    console.log(eventCount);

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
    img.onload = () => {
        callback(true);
    };
    img.onerror = (e) => {
        e.preventDefault();
        callback(false);
    };
    img.src = url;
}

function addImagesToEventViewer(container, data) {
    for (const key in data) {
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

function scrollToTopInit() {
    document.querySelectorAll(".button.scrollToTop").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            scrollTo(document.querySelector("#main"));
        });
    });


    // Makes scroll to top button visible or invisible depending on scroll.
    const scrollToTopButton = document.querySelector("#scrollToTop");
    window.addEventListener("scroll", (e) => {
        e.preventDefault();
        if (window.scrollY >= 500) scrollToTopButton.classList.add("active");
        else scrollToTopButton.classList.remove("active");
    });
}


window.onload = () => {
    document.querySelector("#footer .copyright .time").textContent = new Date().getFullYear();
    scrollToTopInit();

    getJSON("./assets/json/events.json", (data) => {
        addEvents(data);
    });

    // // ---------------------- Temp ---------------------- \\
    // document.querySelectorAll(".event").forEach(el => {
    //     el.addEventListener("click", (e) => {
    //         e.preventDefault();
    //         scrollTo(document.querySelector("#eventViewer"));
    //     });
    // });
}