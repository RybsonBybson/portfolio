const updateTimer = () => {
  const now = Date.now();
  const diff = revealDate - now;
  const totalSeconds = Math.floor(diff / 1000);

  const daysLeft = Math.floor(totalSeconds / (60 * 60 * 24));
  const hoursLeft = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutesLeft = Math.floor((totalSeconds % (60 * 60)) / 60);
  const secondsLeft = totalSeconds % 60;

  document.querySelector("#seconds").innerHTML = String(secondsLeft).padStart(2, "0");
  document.querySelector("#minutes").innerHTML = String(minutesLeft).padStart(2, "0");
  document.querySelector("#hours").innerHTML = String(hoursLeft).padStart(2, "0");
  document.querySelector("#days").innerHTML = daysLeft;
};
const revealDate = new Date(2025, 9, 1);

updateTimer();
const interval = window.setInterval(updateTimer, 1000);
