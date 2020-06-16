/* eslint-disable indent */
let canvas;
let context;

let player;
let opponent;

let canInput = true;

const messageBox = new MessageBox('/img/messageBox.png', 0, 472);
const optionsBox = new OptionsBox('/img/optionsBox.png', 500, 472);

$(document).ready(() => {
  loadData();

  $(document.body).on('keydown', event => {
    if (!canInput) {
      return;
    }
    switch (event.which) {
      case 13: // Enter key
        const attack = optionsBox.chooseOption(player, messageBox);
        if (attack) {
          canInput = false;

          playerAttack(attack);
        } else {
          drawCanvas();
        }
        break;
      case 38: // Up key
        optionsBox.keyUp();
        drawCanvas();
        break;
      case 40: // Down key
        optionsBox.keyDown();
        drawCanvas();
        break;
      default:
        break;
    }
  });
});

function loadData() {
  $.ajax({
    url: '/api/pokemon/' + playerPokemon,
    method: 'get'
  })
    .then(results => {
      player = new Pokemon(
        results.name,
        results.stats,
        results.moves,
        results.type1,
        results.type2,
        results.sprite,
        32,
        344
      );
    })
    .then(() => {
      $.ajax({
        url: '/api/pokemon/' + opponentPokemon,
        method: 'get'
      })
        .then(results => {
          opponent = new Pokemon(
            results.name,
            results.stats,
            results.moves,
            results.type1,
            results.type2,
            results.sprite,
            640,
            32
          );
        })
        .then(initCanvas);
    });
}

function initCanvas() {
  canvas = $('#battle-canvas')[0];
  context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;

  drawCanvas();
}

function drawCanvas() {
  // Clear
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);

  player.draw(context);
  opponent.draw(context);
  messageBox.draw(context);
  optionsBox.draw(context);
}

function playerAttack(move) {
  const moveName = player['move' + move].name;
  messageBox.setMessage(
    player.name + ' uses ' + formatMoveName(moveName) + '!'
  );

  drawCanvas();

  setTimeout(() => {
    player.attackPokemon(move, opponent);

    // Queue up enemy attack after displaying info for .5s
    setTimeout(opponentAttack, 500);
  }, 500);
}

function opponentAttack() {
  canInput = true;
}
