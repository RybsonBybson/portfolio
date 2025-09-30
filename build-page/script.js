const setDate = (daysLeft, hoursLeft, minutesLeft, secondsLeft) => {
  document.querySelector("#seconds").innerHTML = String(secondsLeft).padStart(
    2,
    "0"
  );
  document.querySelector("#minutes").innerHTML = String(minutesLeft).padStart(
    2,
    "0"
  );
  document.querySelector("#hours").innerHTML = String(hoursLeft).padStart(
    2,
    "0"
  );
  document.querySelector("#days").innerHTML = daysLeft;
};

const updateTimer = () => {
  const now = Date.now();
  const diff = revealDate - now;
  const totalSeconds = Math.floor(diff / 1000);

  const daysLeft = Math.floor(totalSeconds / (60 * 60 * 24));
  const hoursLeft = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutesLeft = Math.floor((totalSeconds % (60 * 60)) / 60);
  const secondsLeft = totalSeconds % 60;
  setDate(daysLeft, hoursLeft, minutesLeft, secondsLeft);

  // const audio = new Audio(`audio/click.mp3`);
  // audio.play();
};

const showEgg = () => {
  document.querySelector(".timing-cancel").style.display = "flex";
};

const show2Egg = () => {
  document.querySelector(".oops").style.display = "flex";
};

const decision = () => {
  if (!timerPassed()) {
    updateTimer();
    return;
  }
  const timeSinceShouldBeReleased = Date.now() - revealDate;
  const sec = timeSinceShouldBeReleased / 1000;
  setDate(0, 0, 0, 0);
  showEgg();

  if (sec > egg2) show2Egg();
};

const timerPassed = () => {
  return revealDate < Date.now();
};

// =================

const egg2 = 60 * 60 * 48; // 48 hours = 2 days
const revealDate = new Date(2025, 9, 1);
decision();
const interval = window.setInterval(decision, 1000);
