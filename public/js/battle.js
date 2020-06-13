/* eslint-disable no-unused-vars */
let canvas = null;
let context = null;

let player = null;
const playerSprite = new Image();

let opponent = null;
const opponentSprite = new Image();

const messageText = '';
const messageBoxImage = null;

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
        results.type2
      );
      playerSprite.src = results.sprite;
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
            results.type2
          );
          opponentSprite.src = results.sprite;
        })
        .then(initCanvas);
    });
}

function initCanvas() {
  canvas = $('#battle-canvas')[0];
  context = canvas.getContext('2d');
}

function drawCanvas() {
  context.drawImage(
    playerSprite,
    32,
    344,
    playerSprite.width * 4,
    playerSprite.height * 4
  );
  context.drawImage(
    opponentSprite,
    640,
    32,
    opponentSprite.width * 4,
    opponentSprite.height * 4
  );
}
