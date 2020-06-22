/* eslint-disable prettier/prettier */
/* eslint-disable indent */
let canvas;
let context;

let player;
let opponent;

let playerHealth;
let opponentHealth;

let canInput = false;

let isGameOver = false;

const messageWaitTime = 1250;

const messageBox = new MessageBox('/img/messageBox.png', 0, 472);
const optionsBox = new OptionsBox('/img/optionsBox.png', 500, 472);

$(document).ready(() => {
  loadData();

  $(document.body).on('keydown', event => {
    if (!canInput) {
      return;
    } else if (isGameOver) {
      window.location.href = '/';
    }

    switch (event.which) {
      case 13: // Enter key
        const attack = optionsBox.chooseOption(player, messageBox);
        if (attack) {
          canInput = false;
          optionsBox.drawOptions = false;

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
    playerHealth = new HealthBox(
      player.maxHP,
      player.name,
      544,
      344,
      '/img/healthBox.png'
    );
  });

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
      opponentHealth = new HealthBox(
        opponent.maxHP,
        opponent.name,
        0,
        0,
        '/img/healthBox.png'
      );
    });

    initCanvas();
}

function initCanvas() {
  canvas = $('#battle-canvas')[0];
  context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;

  optionsBox.drawOptions = false;

  messageBox.setMessage('Loading...');

  drawCanvas();

  startGame();
}

function startGame() {
  if (!player || !opponent || !player.isLoaded() || !opponent.isLoaded()) {
    setTimeout(startGame, 50);
    return;
  }

  // Opponent goes first if they have higher speed
  if (opponent.speed > player.speed) {
    canInput = false;
    messageBox.setMessage('It looks like your opponent\nhas more speed than you!');
    drawCanvas();
    setTimeout(opponentAttack, messageWaitTime);
  } else {
    messageBox.setMessage('');
    optionsBox.drawOptions = true;
    canInput = true;
    drawCanvas();
  }
}

function drawCanvas() {
  // Clear
  context.fillStyle = 'white';
  context.fillRect(0, 0, 800, 600);

  if (player && opponent) {
    player.draw(context);
    opponent.draw(context);
    playerHealth.draw(context);
    opponentHealth.draw(context);
  }
  messageBox.draw(context);
  optionsBox.draw(context);
}

async function playerAttack(move) {
  const damage = await attackPokemon(player, opponent, move);

  if (damage !== 0) {
    await pokemonTakesDamage(opponent, damage);
  }

  if (isGameOver) {
    endGame(player, opponent);
  }
  else {
    opponentAttack();
  }
}

async function opponentAttack() {
  const randomMove = Math.floor(Math.random() * 4 + 1);
  const damage = await attackPokemon(opponent, player, randomMove);

  if (damage !== 0) {
    await pokemonTakesDamage(player, damage);
  }

  if (isGameOver) {
    endGame(opponent, player);
  } else {
    canInput = true;
    optionsBox.drawOptions = true;
    messageBox.setMessage('');
    drawCanvas();
  }
}

async function pokemonTakesDamage(pokemon, amount) {
  amount = Math.floor(amount);
  pokemon.takeDamage(amount);

  playerHealth.setHealth(player.hp);
  opponentHealth.setHealth(opponent.hp);

  drawCanvas();

  await wait(messageWaitTime);

  if (opponent.hp <= 0 || player.hp <= 0) {
    isGameOver = true;
  }
}

async function attackPokemon(attacking, target, move) {
  const moveName = attacking['move' + move].name;
  messageBox.setMessage(
    attacking.name + ' uses ' + formatMoveName(moveName) + '!'
  );

  drawCanvas();

  await wait(messageWaitTime);

  const attackResult = attacking.attackPokemon(move, target);
  attackResult.minTimesToAttack -= 1;
  attackResult.maxTimesToAttack -= 1;

  let timesHit = 1;
  let totalDamage = attackResult.damage;

  // If we missed
  if (attackResult.effective < 0) {
    messageBox.setMessage('It missed!');
    drawCanvas();

    await wait(messageWaitTime);

    return 0;
  }

  // If we are hitting multiple times
  if (attackResult.minTimesToAttack > 0) {
    const timesToHit = Math.ceil(
      Math.random() *
        (attackResult.maxTimesToAttack - attackResult.minTimesToAttack)
    );
    timesHit += timesToHit;
    for (let i = 0; i < timesToHit; i++) {
      totalDamage += attacking.attackPokemon(move, target).damage;
    }

    messageBox.setMessage('Hit ' + timesHit + ' times');
    drawCanvas();
    
    await wait(messageWaitTime);
  }

  // If we crit
  await displayCrit(attackResult.crit);

  // Display effectiveness
  await displayEffectiveness(attackResult.effective);

  return totalDamage;
}

async function endGame(winner, loser) {
  messageBox.setMessage(loser.name + ' was defeated,\ncongrats ' + winner.name + '!');
  loser.sprite.src = '';
  drawCanvas();

  await wait(messageWaitTime);

  messageBox.setMessage('Press any key to go back to the home\npage.');
  drawCanvas();
  canInput = true;
}

async function displayEffectiveness(effectiveness) {
  if (effectiveness === 0) {
    messageBox.setMessage('It has no effect...');
  } else if (effectiveness < 1) {
    messageBox.setMessage('It is not very effective.');
  } else if (effectiveness === 1) {
    // Don't say anything
  } else if (effectiveness > 1) {
    messageBox.setMessage('It is super effective!');
  }

  if (effectiveness !== 1) {
    drawCanvas();
    await wait(messageWaitTime);
  }
}

async function displayCrit(crit) {
  if (crit) {
    messageBox.setMessage('Critical hit!');
    drawCanvas();

    await wait(messageWaitTime);
  }
}

async function wait(ms) {
  // eslint-disable-next-line no-empty-function
  return new Promise(resolve => setTimeout(resolve, ms));
}
