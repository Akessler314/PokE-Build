/* eslint-disable indent */
/* eslint-disable no-unused-vars */
let canvas = null;
let context = null;

let player = null;
let opponent = null;

const messageBox = new MessageBox('/img/messageBox.png', 0, 472);
const optionsBox = new OptionsBox('/img/optionsBox.png', 500, 472);

$(document).ready(() => {
  loadData();

  $(document.body).on('keydown', event => {
    switch (event.which) {
      case 13: // Enter key
        optionsBox.chooseOption(player, messageBox);
        drawCanvas();
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

  messageBox.setMessage('Hello! This is a test...');

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
