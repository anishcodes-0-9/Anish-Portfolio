export function createFootballGamePanel() {
  return {
    render(container) {
      container.innerHTML = `

<div class="football-game">

<h2>⚽ Football Challenge</h2>

<div id="game-area">

<div id="ball">⚽</div>

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

      let y = 140;
      let velocity = 0;
      let rotation = 0;

      let gravity = 0.16;
      let flapPower = -2.8;

      let score = 0;
      let playing = false;

      const GAP_SIZE = 140;

      const POSTS = [];
      const POST_SPACING = 200;
      const POST_COUNT = 4;

      /* RESET GAME */

      function resetGame() {
        y = 140;
        velocity = 0;
        rotation = 0;

        score = 0;
        scoreEl.textContent = score;

        POSTS.length = 0;

        for (let i = 0; i < POST_COUNT; i++) {
          POSTS.push({
            x: 420 + i * POST_SPACING,
            gapY: randomGap(),
          });
        }

        updatePosts();

        ball.style.top = y + "px";
      }

      /* RANDOM GAP */

      function randomGap() {
        return 60 + Math.random() * 120;
      }

      /* UPDATE POSTS */

      function updatePosts() {
        POSTS.forEach((post, index) => {
          let top = container.querySelector(`#post-top-${index}`);
          let bottom = container.querySelector(`#post-bottom-${index}`);

          if (!top) {
            top = document.createElement("div");
            bottom = document.createElement("div");

            top.className = "goal-post";
            bottom.className = "goal-post";

            top.id = `post-top-${index}`;
            bottom.id = `post-bottom-${index}`;

            area.appendChild(top);
            area.appendChild(bottom);
          }

          top.style.height = post.gapY + "px";

          bottom.style.height = 260 - post.gapY - GAP_SIZE + "px";

          top.style.left = post.x + "px";
          bottom.style.left = post.x + "px";

          bottom.style.bottom = "0px";
        });
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

        velocity = Math.min(flapPower, velocity - 1);
      }

      /* GAME LOOP */

      function loop() {
        if (!playing) return;

        velocity += gravity;
        velocity = Math.min(velocity, 4);

        y += velocity;

        ball.style.top = y + "px";

        /* spin ball */

        rotation += velocity * 2;
        ball.style.transform = `rotate(${rotation}deg)`;

        /* move posts */

        POSTS.forEach((post) => {
          post.x -= 1.2;

          if (post.x < -60) {
            post.x = 420 + POST_SPACING;

            post.gapY = randomGap();

            score++;
            scoreEl.textContent = score;

            /* increase difficulty gradually */

            if (score % 5 === 0) {
              gravity += 0.01;
            }
          }
        });

        updatePosts();

        /* collision detection */

        const ballTop = y;
        const ballBottom = y + 40;

        POSTS.forEach((post) => {
          if (post.x < 200 && post.x > 120) {
            const gapTop = post.gapY;
            const gapBottom = post.gapY + GAP_SIZE;

            if (ballTop < gapTop || ballBottom > gapBottom) {
              gameOver();
            }
          }
        });

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
