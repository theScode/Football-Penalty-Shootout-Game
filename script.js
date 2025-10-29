const goalSound = new Audio("goal.mp3");
const missSound = new Audio("miss.mp3");
const gameOverSound = new Audio("gameover.mp3");
const message =document.getElementById("message");
const leftBtn = document.getElementById("left");
const centerBtn = document.getElementById("center");
const rightBtn = document.getElementById("right");
const restartBtn = document.getElementById("restart");

const shotsDisplay = document.getElementById("shots");
const scoreDisplay = document.getElementById("score");

let shots=0,score=0;
const totalShots=5;

leftBtn.addEventListener("click",()=> shoot("left"));
centerBtn.addEventListener("click", () => shoot("center"));
rightBtn.addEventListener("click", () => shoot("right"));

function playSound(sound) {
  // Stop any currently playing sound before playing the new one
  sound.pause();
  sound.currentTime = 0;
  sound.play();
}

function shoot(direction)
{
    if(shots>=totalShots) return;
    shots++;
    shotsDisplay.textContent=shots;//updated on the screen

    const goalkeeperMove=["left","center","right"][Math.floor(Math.random()*3)];
    // Animate goalkeeper dive
    const goalkeeper = document.getElementById("goalkeeper");

    if (goalkeeperMove === "left") goalkeeper.style.left = "20%";
    else if (goalkeeperMove === "right") goalkeeper.style.left = "80%";
    else goalkeeper.style.left = "50%";

    // Return goalkeeper to center after 1 second
    setTimeout(() => {
    goalkeeper.style.left = "50%";
    }, 1000);

    if(direction===goalkeeperMove)
    {
        message.textContent="😞 Missed! Goalkeeper saved it!";
        message.style.color = "#ff4d4d"; // red for miss
        playSound(missSound);
    }
    else
    {
    message.textContent = "🎯 Goal!!!";
    message.style.color = "#00ffaa"; // neon green for goal
    playSound(goalSound);
    score++;
    scoreDisplay.textContent = score; // update score
    scoreDisplay.classList.add("glow");

  // Remove glow after animation ends
    setTimeout(() => {
    scoreDisplay.classList.remove("glow");
  }, 1000);
    }
    if (shots === totalShots) {
    setTimeout(endGame, 1000); // wait 1 second then end game
    }
}

function endGame() 
    {
    playSound(gameOverSound);;
   message.textContent = `🏁 Game Over! You scored ${score} out of ${totalShots}!`;

    // Trigger fireworks if perfect score
    if (score === totalShots) {
    launchFireworks();
    }

    leftBtn.disabled = true;
    centerBtn.disabled = true;
    rightBtn.disabled = true;
    
    restartBtn.style.display = "block";
}
restartBtn.addEventListener("click", () => {
  shots = 0;
  score = 0;

  shotsDisplay.textContent = shots;
  scoreDisplay.textContent = score;

  message.textContent = "Choose a direction to shoot your penalty!";
  
  leftBtn.disabled = false;
  centerBtn.disabled = false;
  rightBtn.disabled = false;

  restartBtn.style.display = "none";
});

function launchFireworks() {
  const container = document.getElementById("fireworks-container");
  container.innerHTML = ""; // clear old fireworks

  for (let i = 0; i < 30; i++) {
    const firework = document.createElement("div");
    firework.classList.add("firework");

    // random color
    firework.style.setProperty("--color", `hsl(${Math.random() * 360}, 100%, 60%)`);

    // random direction
    firework.style.setProperty("--x", `${(Math.random() - 0.5) * 400}px`);
    firework.style.setProperty("--y", `${(Math.random() - 0.5) * 400}px`);

    // random position on screen
    firework.style.left = `${Math.random() * 100}%`;
    firework.style.top = `${Math.random() * 50}%`;

    container.appendChild(firework);

    // remove each firework after animation ends
    setTimeout(() => firework.remove(), 1000);
  }

  // auto remove all after 1.5 sec
  setTimeout(() => {
    container.innerHTML = "";
  }, 1500);
}

