/* eslint-disable no-unused-vars */
let canvas;
let context;
let player = null;
const playerSprite = new Image();
let opponent = null;
const opponentSprite = new Image();

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

  context.drawImage(playerSprite, 50, 50);
  context.drawImage(opponentSprite, 100, 100);
}
