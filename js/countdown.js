const targetDate = new Date("2026-06-24T00:00:00+05:30");

function updateCountdown(){

    const now = new Date();

    const difference = targetDate - now;

    if(difference <= 0){

        window.location.href = "birthday.html";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60))
        / 1000
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown,1000);

const messages = [
    "The teddy is protecting your gift 🧸",
    "Almost there, Duddu Raani 🎀",
    "Someone spent a lot of time making this ❤️",
    "Patience princess 🌸",
    "A very special surprise is waiting 🎁",
    "24 June is getting closer ❤️"
];

let current = 0;

setInterval(() => {

    current++;

    document.getElementById("messageBox").textContent =
        messages[current % messages.length];

},5000);

document.getElementById("giftBtn").addEventListener("click",() => {

    alert(
        "Nice try, Duddu Raani 😌\n\nYour surprise unlocks on 24 June 2026 ❤️"
    );

});