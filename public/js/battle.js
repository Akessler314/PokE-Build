/* eslint-disable no-unused-vars */
let canvas = null;
let context = null;

let player = null;

let opponent = null;
const opponentSprite = new Image();

const messageBox = new MessageBox('/img/messageBox.png');
const optionsBox = new OptionsBox('/img/optionsBox.png');

$(document).ready(() => {
  loadData();
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
        results.sprite
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
            results.sprite
          );
        })
        .then(initCanvas);
    });
}

function initCanvas() {
  canvas = $('#battle-canvas')[0];
  context = canvas.getContext('2d');

  drawCanvas();
}

function drawCanvas() {
  // Clear
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.drawImage(
    player.sprite,
    8,
    86,
    player.sprite.width,
    player.sprite.height
  );
  context.drawImage(
    opponent.sprite,
    160,
    8,
    opponent.sprite.width,
    opponent.sprite.height
  );
  context.drawImage(
    messageBox.sprite,
    0,
    118,
    messageBox.sprite.width,
    messageBox.sprite.height
  );
  context.drawImage(
    optionsBox.sprite,
    125,
    118,
    optionsBox.sprite.width,
    optionsBox.sprite.height
  );
}
