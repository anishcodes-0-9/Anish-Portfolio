export function createFootballGamePanel() {
  return {
    render(container) {
      container.innerHTML = `

<div class="football-game">

<h2>⚽ Football Challenge</h2>

<div id="game-area">

<div id="ball">⚽</div>

<div id="post-top" class="goal-post"></div>
<div id="post-bottom" class="goal-post"></div>

</div>

<div class="game-ui">
Score: <span id="score">0</span>
</div>

<div class="game-buttons">
<button id="start-game">Start Game</button>
<button id="instructions-btn">Instructions</button>
</div>

<div id="instructions-panel" class="instructions hidden">
<h3>How To Play</h3>

<p>Keep the football flying and pass through the goal posts.</p>

<ul>
<li>Press <b>Space</b> or <b>Click</b> to kick the ball upward.</li>
<li>The ball constantly falls due to gravity.</li>
<li>Pass between goal posts to score.</li>
<li>Each pass = +1 point.</li>
<li>Hit a goal post or the ground → Game Over.</li>
</ul>

<button id="close-instructions">Close</button>

</div>

</div>
`;

      const instructionsBtn = container.querySelector("#instructions-btn");
      const instructionsPanel = container.querySelector("#instructions-panel");
      const closeInstructions = container.querySelector("#close-instructions");

      instructionsBtn.addEventListener("click", () => {
        instructionsPanel.classList.remove("hidden");
      });

      closeInstructions.addEventListener("click", () => {
        instructionsPanel.classList.add("hidden");
      });

      const ball = container.querySelector("#ball");
      const area = container.querySelector("#game-area");
      const startBtn = container.querySelector("#start-game");
      const scoreEl = container.querySelector("#score");

      const postTop = container.querySelector("#post-top");
      const postBottom = container.querySelector("#post-bottom");

      let y = 140;
      let velocity = 0;

      let gravity = 0.14;
      let flapPower = -4.2;

      let postX = 420;
      let gapY = 120;

      let score = 0;

      let playing = false;

      const GAP_SIZE = 140;

      /* RESET GAME */

      function resetGame() {
        y = 140;
        velocity = 0;

        postX = 420;

        score = 0;

        scoreEl.textContent = score;

        gapY = randomGap();

        updatePosts();

        ball.style.top = y + "px";
      }

      /* RANDOM GAP */

      function randomGap() {
        return 60 + Math.random() * 120;
      }

      /* UPDATE POSTS */

      function updatePosts() {
        postTop.style.height = gapY + "px";

        postBottom.style.height = 260 - gapY - GAP_SIZE + "px";

        postBottom.style.bottom = "0px";

        postTop.style.left = postX + "px";
        postBottom.style.left = postX + "px";
      }

      /* START GAME */

      function startGame() {
        resetGame();

        playing = true;

        loop();
      }

      /* FLAP */

      function flap() {
        if (!playing) return;

        /* consistent upward kick */

        velocity = flapPower;
      }

      /* GAME LOOP */

      function loop() {
        if (!playing) return;

        /* physics */

        velocity += gravity;

        /* clamp fall speed */

        velocity = Math.min(velocity, 4);

        y += velocity;

        ball.style.top = y + "px";

        /* move posts */

        postX -= 1.2;

        /* obstacle reset */

        if (postX < -60) {
          postX = 420;

          gapY = randomGap();

          updatePosts();

          score++;

          scoreEl.textContent = score;
        }

        /* apply position */

        postTop.style.left = postX + "px";
        postBottom.style.left = postX + "px";

        /* collision detection */

        const ballTop = y;
        const ballBottom = y + 40;

        const gapTop = gapY;
        const gapBottom = gapY + GAP_SIZE;

        if (postX < 200 && postX > 120) {
          if (ballTop < gapTop || ballBottom > gapBottom) {
            gameOver();

            return;
          }
        }

        /* floor / ceiling */

        if (y < 0 || y > 230) {
          gameOver();

          return;
        }

        requestAnimationFrame(loop);
      }

      /* GAME OVER */

      function gameOver() {
        playing = false;

        setTimeout(() => {
          alert("Game Over ⚽ Score: " + score);
        }, 100);
      }

      /* CONTROLS */

      area.addEventListener("click", flap);

      function keyHandler(e) {
        if (e.code === "Space") {
          e.preventDefault();

          flap();
        }
      }

      window.addEventListener("keydown", keyHandler);

      startBtn.addEventListener("click", startGame);
    },
  };
}
