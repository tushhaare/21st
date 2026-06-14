// ======================================
// TIMELINE LOADER
// ======================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

async function loadTimeline() {

    try {

        const response = await fetch("data/timeline.json");

        const timeline = await response.json();

        const container =
            document.getElementById("timelineContainer");

        let currentYear = "";

        timeline.forEach((item) => {

            // =========================
            // YEAR DIVIDER
            // =========================

            const year = item.date.split("-")[0];

            if (year !== currentYear) {

                currentYear = year;

                const divider =
                    document.createElement("div");

                divider.className = "year-divider";

                divider.innerHTML = `
                    <span>🌸 ${year}</span>
                `;

                container.appendChild(divider);

            }

            // =========================
            // TIMELINE ITEM
            // =========================

            const card =
                document.createElement("div");

            card.className = "timeline-item";

            // Date formatting

            const [yearPart, monthPart, dayPart] =
                item.date.split("-");

            const dateObj =
                new Date(
                    yearPart,
                    monthPart - 1,
                    dayPart
                );

            const formattedDate =
                dateObj.toLocaleDateString(
                    "en-GB",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );

            // =========================
            // MEDIA
            // =========================

            let mediaHTML = "";

            if (item.photos && item.photos.length) {

                item.photos.forEach((photo) => {

                    mediaHTML += `
                        <img
                            src="${photo}"
                            class="timeline-image"
                            loading="lazy"
                            alt="Memory"
                        >
                    `;

                });

            }

            if (item.videos && item.videos.length) {

                item.videos.forEach((video) => {

                    mediaHTML += `
                        <video
class="timeline-video"
muted
loop
autoplay
playsinline
controls
preload="metadata"
>
                            <source
                                src="${video}"
                                type="video/mp4"
                            >
                        </video>
                    `;

                });

            }

            card.innerHTML = `

                <div class="timeline-heart">
                    ❤️
                </div>

                <div class="timeline-date">
                    ${formattedDate}
                </div>

                <div class="media-card">

                    <div class="gallery-grid">

                        ${mediaHTML}

                    </div>

                </div>

            `;

            container.appendChild(card);

            observer.observe(card);

        });

    } catch (error) {

        console.error(
            "Timeline loading failed:",
            error
        );

    }

}

loadTimeline();


// ======================================
// LIGHTBOX
// ======================================

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");

document.addEventListener("click", (e) => {

    if (
        e.target.classList.contains("timeline-image")
    ) {

        lightboxImage.src = e.target.src;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }

});

closeLightbox.addEventListener("click", () => {

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";

});

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});



// ======================================
// ESC KEY SUPPORT
// ======================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        lightbox.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});

function createHeart(){

    const heart =
        document.createElement("div");

    heart.classList.add("floating-heart");

    const hearts = [
    "❤️",
    "💖",
    "💕",
    "💗",
    "💞"
];

heart.innerHTML =
    hearts[
        Math.floor(
            Math.random() * hearts.length
        )
    ];

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (12 + Math.random()*20) + "px";

    heart.style.animationDuration =
        (8 + Math.random()*8) + "s";

    document
        .getElementById("hearts-container")
        .appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },16000);

}

setInterval(createHeart,1500);


function updateRelationshipTime() {

    const startDate =
        new Date("2023-11-03T00:00:00");

    const now =
        new Date();

    let years =
        now.getFullYear() -
        startDate.getFullYear();

    let months =
        now.getMonth() -
        startDate.getMonth();

    let days =
        now.getDate() -
        startDate.getDate();

    if (days < 0) {

        months--;

        const previousMonth =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                0
            );

        days += previousMonth.getDate();
    }

    if (months < 0) {

        years--;

        months += 12;
    }

    const totalMilliseconds =
        now - startDate;

    const hours =
        Math.floor(
            totalMilliseconds /
            (1000 * 60 * 60)
        ) % 24;

    const minutes =
        Math.floor(
            totalMilliseconds /
            (1000 * 60)
        ) % 60;

    const seconds =
        Math.floor(
            totalMilliseconds /
            1000
        ) % 60;

    document.getElementById("relYears").textContent =
        years;

    document.getElementById("relMonths").textContent =
        months;

    document.getElementById("relDays").textContent =
        days;

    document.getElementById("relHours").textContent =
        hours;

    document.getElementById("relMinutes").textContent =
        minutes;

    document.getElementById("relSeconds").textContent =
        seconds;
}

updateRelationshipTime();

setInterval(
    updateRelationshipTime,
    1000
);

const futureMemories = [

    "More random selfies 📸",

    "More late-night conversations 🌙",

    "More 'send me your photo' moments ❤️",

    "More unnecessary arguments 😒",

    "More making up afterwards 🤭",

    "More birthdays together 🎂",

    "More memories we haven't created yet ✨"

];

let futureIndex = 0;

const futureText =
    document.getElementById("futureText");

if(futureText){

    setInterval(() => {

        futureIndex++;

        futureText.style.opacity = 0;

        setTimeout(() => {

            futureText.textContent =
                futureMemories[
                    futureIndex %
                    futureMemories.length
                ];

            futureText.style.opacity = 1;

        },250);

    },3000);

}

const envelope =
    document.getElementById("envelope");

const letterContent =
    document.getElementById("letterContent");

if(envelope){

    envelope.addEventListener("click", () => {

        envelope.classList.add("open");

        setTimeout(() => {

            letterContent.classList.add("show");

            letterContent.scrollIntoView({
                behavior:"smooth",
                block:"center"
            });

        },500);

    });

}

let autoScroll = false;
let scrollInterval;

const autoScrollBtn =
document.getElementById("autoScrollBtn");

if(autoScrollBtn){

    autoScrollBtn.addEventListener("click",()=>{

        autoScroll = !autoScroll;

        if(autoScroll){

            autoScrollBtn.textContent =
            "❤️ Auto Scroll: ON";

            scrollInterval = setInterval(()=>{

                window.scrollBy(0,1);

                if(
                    window.innerHeight +
                    window.scrollY >=
                    document.body.offsetHeight - 10
                ){
                    clearInterval(scrollInterval);

                    autoScroll = false;

                    autoScrollBtn.textContent =
                    "❤️ Auto Scroll: OFF";
                }

            },100);

        }else{

            autoScrollBtn.textContent =
            "❤️ Auto Scroll: OFF";

            clearInterval(scrollInterval);
        }

    });

}

const videoObserver =
new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        const video = entry.target;

        if(entry.isIntersecting){

            video.play().catch(()=>{});

        }else{

            video.pause();

        }

    });

},
{
    threshold:0.6
}
);

setTimeout(()=>{

    document
    .querySelectorAll(".timeline-video")
    .forEach(video=>{

        videoObserver.observe(video);

    });

},1000);
